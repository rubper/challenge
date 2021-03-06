import { PartialObserver } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { ProductDetailComponent } from './../../components/product-detail/product-detail.component';
import { ProductFormComponent } from './../../components/product-form/product-form.component';
import { ProductDeleteComponent } from './../../components/product-delete/product-delete.component';
import { ProductService } from './../../../../core/Services/ProductService/product.service';

import { Result } from 'src/app/core/Models/result.model';
import { Product } from 'src/app/core/Models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.container.html',
  styleUrls: ['./product.container.scss']
})
export class ProductContainer implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  //atributo de la clase donde se almacena la respuesta del servidor api
  result? : Result<Product> = undefined;
  cargandoDialogRef? : MatDialogRef<LoadingComponent> = undefined;
  dataLength : number = 0;

  //---observadores---

  //--get producto / observador parcial
  private getProductsObserver : PartialObserver<Result<Product>> = {
    //caso exito
    next: (resultado : Result<Product>)=> {
      //almacenar el resultado en el atributo de clase correspondiente
      this.result = resultado;
      this.dataLength = resultado.count;
    },
    //caso error
    error: () => {},//pendiente de implementar
    complete: () => this.cargandoDialog.closeAll()
  }

  //--get producto / observador parcial
  private detailProductObserver : PartialObserver<Product> = {
    //caso exito
    next: (producto : Product)=> {
        //abrir dialogo
        const dialogoDetalleRef = this.matDialog.open(
          //usando componente detalle
          ProductDetailComponent,
          //config
          { data : producto,
            autoFocus: false}
          );
          //luego de cerrar el dialogo, subscribirse
        dialogoDetalleRef.afterClosed().subscribe(
          {
            //la respuesta que reciba, debe ser un objeto con un valor 'editado'
            next: (respuesta: { editado: boolean }) => {
              //si del form se recibe que el usuario quiere editar
              if (respuesta?.editado)
                //abrir form
                this.openForm(producto);
            },
            //caso de error
            error: () => {}
          }
        )
    },
    //caso error
    error: () => {},//pendiente de implementar
    //verifica si cargandoDialogRef no esta vacio, y si no lo esta cierra el dialogo
    complete: () => {if(this.cargandoDialogRef){this.cargandoDialogRef.close()}}
  }

  //--actualizar producto / observador parcial
  private updateProductObserver : PartialObserver<Product> = {
    //caso de exito
    next: (producto : Product) => {
      this.openForm(producto);
    },
    //caso de error
    error: () => {},
    //verifica si cargandoDialogRef no esta vacio, y si no lo esta cierra el dialogo
    complete: () => {
      if(this.cargandoDialogRef){this.cargandoDialogRef.close()}}
  }

  //---constructor---

  constructor(
    private productService: ProductService,
    private matDialog : MatDialog,
    private cargandoDialog : MatDialog
    ) {
    }

  //al iniciar el componente
  ngOnInit(): void {
    //traer los productos por primera vez
    this.getProducts(0);
  }

  //---metodos crud---

  //trae los productos
  getProducts(pageEvent: PageEvent | number): void{
    this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //Obtener el n??mero de p??gina: S?? el tipo de la variable page event es number
    //  entonces asignar la variable, caso contrario asignar el atributo index de la variable
    //  sumar uno ya que es un ??ndice
    const numero = (typeof pageEvent === "number" ? pageEvent : pageEvent.pageIndex) + 1;
    //definir el tama??o de p??gina
    let pageSize = 10;
    //Si la variable pageEvent no es un n??mero, utilizar el tama??o de p??gina del objeto pageEvent
    //???? if(pageEvent instanceof PageEvent) { pageSize = pageEvent.pageSize };
    if(typeof pageEvent !== "number") { pageSize = pageEvent.pageSize };
    //subscribirse al servicio que trae los productos, usa el observador definido al inicio
    this.productService.getObjects(numero, pageSize).subscribe(this.getProductsObserver);
  }

  //trae un producto
  detailProduct(id: number): void {
    this.cargandoDialogRef = this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //subscribirse al servicio que trae un objeto, usa el observador definido al inicio
    this.productService.getObject(id).subscribe(this.detailProductObserver);
  }

  //actualiza un producto
  updateProduct(id: number): void {
    this.cargandoDialogRef = this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //subscribirse al servicio que trae un objeto, todavia no se modifica, usa el observador definido al inicio
    this.productService.getObject(id).subscribe(this.updateProductObserver);
  }

  //elimina un producto
  deleteProduct(producto: Product): void {
    this.openConfirmation(producto);
  }

  //---metodos form---

  //abre el formulario (producto puede no venir en caso de ser nuevo producto)
  openForm(producto?: Product) {
    //abrir dialogo con componente de formulario de producto
    const dialogoFormRef = this.matDialog.open(ProductFormComponent, {
      data: producto
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe({
      //caso de exito, del producto obtenido (puede darse el caso que no venga un producto, ej. al cancelar)
      next:(productoDialogo? : Product)=>{
        //si el producto obtenido no es undefined
        if(productoDialogo){
          //y este tiene id (es decir, ya existe en el api)
          if(productoDialogo.id){
            if(productoDialogo.brand)
              if(typeof productoDialogo.brand !== "number")
                productoDialogo.brand=productoDialogo.brand.id;
            if(productoDialogo.category)
              if(typeof productoDialogo.category !== "number")
                productoDialogo.category=productoDialogo.category.id;
              //subscribirse al servicio que modifica un objeto
            this.productService.updateObject(productoDialogo).subscribe({
              //caso de exito
              next: (productoActualizado : Product) => {
                //en el listado de productos, obtener el indice del producto actualizado (si el result no existe, retornar -1 tambien)
                const indice = this.result ? this.result.results.findIndex((producto: Product)=>producto.id === productoActualizado.id) : -1;
                //si el indice no es -1 (es decir, se encuentra en el listado)
                if(indice >= 0) {
                  //si el result existe, actualizar la lista
                  if(this.result) this.result.results[indice] = productoActualizado;
                }
              },
              //caso de error
              error: () => {},
              complete:()=> this.getProducts(this.paginator.pageIndex)
            })
          //en el caso de que no tenga id (es decir, no existe en api)
          } else {
            if(productoDialogo.brand)
              if(typeof productoDialogo.brand !== "number")
                productoDialogo.brand=productoDialogo.brand.id;
                if(productoDialogo.category)
                  if(typeof productoDialogo.category !== "number")
                    productoDialogo.category=productoDialogo.category.id;
            //subscribirse al servicio que ingresa un nuevo producto
            this.productService.postObject(productoDialogo).subscribe(
              {
                //caso de exito (recibe el nuevo producto)
                next: (productoNuevo : Product) => {
                  //agrega el nuevo producto a la lista
                  this.result?.results.push(productoNuevo)
                },
                complete:()=> this.getProducts(this.paginator.pageIndex)
              }
            )
          }
        }
      },
      //caso de error
      error: ()=>{}
    });
  }

  openConfirmation(producto : Product){
    //abrir dialogo con componente de confirmacion de borrado de producto
    const dialogoFormRef = this.matDialog.open(ProductDeleteComponent, {
      data: producto,
      width: '600px',
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        //si el id no es undefined
        if(id) {
          //subscribirse al servicio de eliminacion de producto
          this.productService.deleteObject(id).subscribe(
            {
              //caso exito
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.result){
                  //destructura results, de array result, en variable results
                  const { results } = this.result;
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.result.results = results.filter((product: Product) => product.id !== id);
                }
              },
              //caso error
              error: () => {}
            }
          )
        }
     });

  }

}
