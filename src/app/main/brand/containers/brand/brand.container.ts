import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PartialObserver } from 'rxjs';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Result } from 'src/app/core/Models/result.model';
import { Brand } from './../../../../core/Models/brand.model';

import { BrandService } from 'src/app/core/Services/BrandService/brand.service';

import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { BrandDeleteComponent } from '../../components/brand-delete/brand-delete.component';
import { BrandDetailComponent } from '../../components/brand-detail/brand-detail.component';
import { BrandFormComponent } from '../../components/brand-form/brand-form.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.container.html',
  styleUrls: ['./brand.container.scss']
})
export class BrandContainer implements OnInit {
  result? : Result<Brand> = undefined;
  cargandoDialogRef? : MatDialogRef<LoadingComponent> = undefined;
  dataLength : number = 0;
  @ViewChild('paginator') paginator!: MatPaginator;

  //---observadores---

  //--get brand / observador parcial
  private getBrandsObserver : PartialObserver<Result<Brand>> = {
    next: (resultado : Result<Brand>)=> {
      //almacenar el resultado en el atributo de clase correspondiente
      this.result = resultado;
      this.dataLength = resultado.count;
    },
    //caso error
    error: () => {},//pendiente de implementar
    complete: () => this.cargandoDialog.closeAll()
  }

  //--get brand / observador parcial
  private detailBrandObserver : PartialObserver<Brand> = {
    next: (brand : Brand)=> {
        const dialogoDetalleRef = this.matDialog.open(
          BrandDetailComponent,
          { data : brand }
          );
          //luego de cerrar el dialogo, subscribirse
        dialogoDetalleRef.afterClosed().subscribe(
          {
            next: (respuesta: { editado: boolean }) => {
              //si del form se recibe que el usuario quiere editar, abrir el form
              if (respuesta?.editado)
                this.openForm(brand);
            },
            error: () => {}
          }
        )
    },
    error: () => {},//pendiente de implementar
    //verifica si cargandoDialogRef no esta vacio, y si no lo esta cierra el dialogo
    complete: () => {if(this.cargandoDialogRef){this.cargandoDialogRef.close()}}
  }

  //--actualizar brand / observador parcial
  private updateBrandObserver : PartialObserver<Brand> = {
    next: (brand : Brand) => {
      this.openForm(brand);
    },
    error: () => {},
    complete: () => {if(this.cargandoDialogRef){this.cargandoDialogRef.close()}}
  }

  //---constructor---

  constructor(
    private brandService: BrandService,
    private matDialog : MatDialog,
    private cargandoDialog : MatDialog
    ) {
    }

  //al iniciar el componente
  ngOnInit(): void {
    //traer las marcas por primera vez
    this.getBrands(0);
  }

  //---metodos crud---

  //trae las marcas
  getBrands(pageEvent: PageEvent | number): void{
    this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //obtener numero de pagina, sumar uno ya que se obtiene de un índice
    const numero = (typeof pageEvent === "number" ? pageEvent : pageEvent.pageIndex) + 1;
    let pageSize = 10; //tamano de pagina
    //utilizar el tamaño de página del objeto pageEvent cuando sea un Page Event
    if(typeof pageEvent !== "number") { pageSize = pageEvent.pageSize };
    this.brandService.getObjects(numero, pageSize).subscribe(this.getBrandsObserver);
  }

  //trae un brand
  detailBrand(id: number): void {
    //loading
    this.cargandoDialogRef = this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //suscriptor
    this.brandService.getObject(id).subscribe(this.detailBrandObserver);
  }

  //actualiza un brand
  updateBrand(id: number): void {
    this.cargandoDialogRef = this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    this.brandService.getObject(id).subscribe(this.updateBrandObserver);
  }

  //elimina un brand
  deleteBrand(brand: Brand): void {
    this.openDeleteConfirmation(brand);
  }

  //---metodos form---

  //abre el formulario (brand puede no venir en caso de ser nuevo brand)
  openForm(brand?: Brand) {
    const dialogoFormRef = this.matDialog.open(BrandFormComponent, {
      data: brand
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe({
      //puede darse el caso que no venga un brand, ej. al cancelar
      next:(brandDialogo?: Brand)=>{
        //si el brand obtenido no es undefined y tiene id (es decir, ya existe en el api)
        if(brandDialogo){
          if(brandDialogo.id){
            this.brandService.updateObject(brandDialogo).subscribe({
              next: (brandActualizado : Brand) => {
                //en el listado de brands, obtener el indice del brand actualizado (si el result no existe, retornar -1 tambien)
                const indice = this.result ? this.result.results.findIndex((brand: Brand)=>brand.id === brandActualizado.id) : -1;
                if(indice >= 0) {
                  //si el result existe, actualizar la lista
                  if(this.result) this.result.results[indice] = brandActualizado;
                }
              },
              error: () => {},
              complete:()=> this.getBrands(this.paginator.pageIndex)
            })
          //en el caso de que no tenga id (es decir, no existe en api)
          } else {
            //subscribirse al servicio que ingresa un nuevo brand
            this.brandService.postObject(brandDialogo).subscribe(
              {
                next: (brandNuevo : Brand) => {
                  //agrega el nuevo brand a la lista
                  this.result?.results.push(brandNuevo)
                },
                complete:()=> this.getBrands(this.paginator.pageIndex)
              }
            )
          }
        }
      },
      error: ()=>{}
    });
  }

  openDeleteConfirmation(brand : Brand){
    const dialogoFormRef = this.matDialog.open(BrandDeleteComponent, { data: brand, width: '600px' });
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        if(id) {
          //subscribirse al servicio de eliminacion de brand
          this.brandService.deleteObject(id).subscribe(
            {
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.result){
                  //results = result.results
                  const { results } = this.result;
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.result.results = results.filter((Brand: Brand) => Brand.id !== id);
                }
              },
              error: () => {}
            }
          )
        }
     });

  }
}
