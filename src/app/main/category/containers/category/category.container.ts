import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PartialObserver } from 'rxjs';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Result } from 'src/app/core/Models/result.model';
import { Category } from './../../../../core/Models/category.model';

import { CategoryService } from 'src/app/core/Services/CategoryService/category.service';

import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { CategoryDetailComponent } from '../../components/category-detail/category-detail.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { CategoryDeleteComponent } from '../../components/category-delete/category-delete.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.container.html',
  styleUrls: ['./category.container.scss']
})
export class CategoryContainer implements OnInit {
  //atributo de la clase donde se almacena la respuesta del servidor api
  result? : Result<Category> = undefined;
  cargandoDialogRef? : MatDialogRef<LoadingComponent> = undefined;
  dataLength : number = 0;

  //---observadores---

  //--get category / observador parcial
  private getCategoriesObserver : PartialObserver<Result<Category>> = {
    //caso exito
    next: (resultado : Result<Category>)=> {
      //almacenar el resultado en el atributo de clase correspondiente
      this.result = resultado;
      this.dataLength = resultado.count;
    },
    //caso error
    error: () => {},//pendiente de implementar
    complete: () => this.cargandoDialog.closeAll()
  }

  //--get category / observador parcial
  private detailCategoryObserver : PartialObserver<Category> = {
    //caso exito
    next: (category : Category)=> {
        //abrir dialogo
        const dialogoDetalleRef = this.matDialog.open(
          //usando componente detalle
          CategoryDetailComponent,
          //config
          { data : category }
          );
          //luego de cerrar el dialogo, subscribirse
        dialogoDetalleRef.afterClosed().subscribe(
          {
            //la respuesta que reciba, debe ser un objeto con un valor 'editado'
            next: (respuesta: { editado: boolean }) => {
              //si del form se recibe que el usuario quiere editar
              if (respuesta?.editado)
                //abrir form
                this.openForm(category);
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

  //--actualizar category / observador parcial
  private updateCategoryObserver : PartialObserver<Category> = {
    //caso de exito
    next: (category : Category) => {
      this.openForm(category);
    },
    //caso de error
    error: () => {},
    //verifica si cargandoDialogRef no esta vacio, y si no lo esta cierra el dialogo
    complete: () => {if(this.cargandoDialogRef){this.cargandoDialogRef.close()}}
  }

  //---constructor---

  constructor(
    private categoryService: CategoryService,
    private matDialog : MatDialog,
    private cargandoDialog : MatDialog
    ) {
    }

  //al iniciar el componente
  ngOnInit(): void {
    //traer las categorias por primera vez
    this.getCategories(0);
  }

  //---metodos crud---

  //trae las categorias
  getCategories(pageEvent: PageEvent | number): void{
    this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //numero y tamano de pagina
    const numero = (typeof pageEvent === "number" ? pageEvent : pageEvent.pageIndex) + 1;
    let pageSize = 10;
    if(typeof pageEvent !== "number") { pageSize = pageEvent.pageSize };
    //subscribirse al servicio que trae las categories, usa el observador definido al inicio
    this.categoryService.getObjects(numero, pageSize).subscribe(this.getCategoriesObserver);
  }

  //trae un category
  detailCategory(id: number): void {
    this.cargandoDialogRef = this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //subscribirse al servicio que trae un objeto, usa el observador definido al inicio
    this.categoryService.getObject(id).subscribe(this.detailCategoryObserver);
  }

  //actualiza un category
  updateCategory(id: number): void {
    this.cargandoDialogRef = this.cargandoDialog.open(LoadingComponent, {disableClose:true});
    //subscribirse al servicio que trae un objeto, todavia no se modifica, usa el observador definido al inicio
    this.categoryService.getObject(id).subscribe(this.updateCategoryObserver);
  }

  //elimina un category
  deleteCategory(category: Category): void {
    this.openConfirmation(category);
  }

  //---metodos form---

  //abre el formulario (category puede no venir en caso de ser nuevo category)
  openForm(category?: Category) {
    //abrir dialogo con componente de formulario de category
    const dialogoFormRef = this.matDialog.open(CategoryFormComponent, {
      data: category,
      width: '600px',
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe({
      //caso de exito, del category obtenido (puede darse el caso que no venga un category, ej. al cancelar)
      next:(categoryDialogo?: Category)=>{
        //si el category obtenido no es undefined
        if(categoryDialogo){
          //y este tiene id (es decir, ya existe en el api)
          if(categoryDialogo.id){
            //subscribirse al servicio que modifica un objeto
            this.categoryService.updateObject(categoryDialogo).subscribe({
              //caso de exito
              next: (categoryActualizado : Category) => {
                //en el listado de categorys, obtener el indice del category actualizado (si el result no existe, retornar -1 tambien)
                const indice = this.result ? this.result.results.findIndex((category: Category)=>category.id === categoryActualizado.id) : -1;
                //si el indice no es -1 (es decir, se encuentra en el listado)
                if(indice >= 0) {
                  //si el result existe, actualizar la lista
                  if(this.result) this.result.results[indice] = categoryActualizado;
                }
              },
              //caso de error
              error: () => {}
            })
          //en el caso de que no tenga id (es decir, no existe en api)
          } else {
            //subscribirse al servicio que ingresa un nuevo category
            this.categoryService.postObject(categoryDialogo).subscribe(
              {
                //caso de exito (recibe el nuevo category)
                next: (categoryNuevo : Category) => {
                  //agrega el nuevo category a la lista
                  this.result?.results.push(categoryNuevo)
                }
              }
            )
          }
        }
      },
      //caso de error
      error: ()=>{}
    });
  }

  openConfirmation(category : Category){
    //abrir dialogo con componente de confirmacion de borrado de category
    const dialogoFormRef = this.matDialog.open(CategoryDeleteComponent, {
      data: category,
      width: '600px',
    });
    //subscribirse al observable obtenido de cerrar el dialogo
    dialogoFormRef.afterClosed().subscribe((id? : number) => {
        //si el id no es undefined
        if(id) {
          //subscribirse al servicio de eliminacion de category
          this.categoryService.deleteObject(id).subscribe(
            {
              //caso exito
              next: (response: HttpResponse<never>) => {
                //si el result existe
                if(this.result){
                  //destructura results, de array result, en variable results
                  const { results } = this.result;
                  //asigna a result.results, un arreglo tal que ninguno de sus elementos contiene id
                  this.result.results = results.filter((Category: Category) => Category.id !== id);
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
