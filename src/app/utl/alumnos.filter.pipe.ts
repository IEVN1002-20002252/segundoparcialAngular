import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumnoFilter',
  standalone: true
})
export class AlumnoFilterPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    let filter: string = args ? args.toLocaleLowerCase() : '';
    
    return filter ? value.filter((alumno: any) =>
      alumno.nombre.toLocaleLowerCase().indexOf(filter) !== -1
    ) : value;
  }

}