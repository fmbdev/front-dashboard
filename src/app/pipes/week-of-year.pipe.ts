import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekOfYear'
})
export class WeekOfYearPipe implements PipeTransform {

  transform(value: string): string {
    return this.findWeekByDate(value);
  }

  private findWeekByDate(value: string): string{

    // Variables
    var fecha
    var dia;
    var mes;
    var anio;
    var semana;

    // Partimos la fecha en trozos para obtener dia, mes y año por separado
   fecha = value.split("-"); //Dividimos el string de fecha en trozos (dia,mes,año)
   dia = parseInt(fecha[2]);
   mes = parseInt(fecha[1]);
   anio = parseInt(fecha[0]);

    if (mes=='1' || mes=='2'){
      //Cálculos si el mes es Enero o Febrero
      var a   =   anio-1;
      var b   =   Math.floor(a/4)-Math.floor(a/100)+Math.floor(a/400);
      var c   =   Math.floor((a-1)/4)-Math.floor((a-1)/100)+Math.floor((a-1)/400);
      var s   =   b-c;
      var e   =   0;
      var f   =   dia-1+(31*(mes-1));
   } else {
      //Calculos para los meses entre marzo y Diciembre
      a   =   anio;
      b   =   Math.floor(a/4)-Math.floor(a/100)+Math.floor(a/400);
      c   =   Math.floor((a-1)/4)-Math.floor((a-1)/100)+Math.floor((a-1)/400);
      s   =   b-c;
      e   =   s+1;
      f   =   dia+Math.floor(((153*(mes-3))+2)/5)+58+s;
   };

    //Adicionalmente sumándole 1 a la variable $f se obtiene numero ordinal del dia de la fecha ingresada con referencia al año actual.

    //Estos cálculos se aplican a cualquier mes
    var g   =   (a+b)%7;
    var d   =   (f+g-e)%7; //Adicionalmente esta variable nos indica el dia de la semana 0=Lunes, ... , 6=Domingo.
    var n   =   f+3-d;
    
    if (n<0){
        //Si la variable n es menor a 0 se trata de una semana perteneciente al año anterior
        semana   =   53-Math.floor((g-s)/5);
        anio      =   anio-1; 
    } else if (n>(364+s)) {
        //Si n es mayor a 364 + $s entonces la fecha corresponde a la primera semana del año siguiente.
        semana   = 1;
        anio   =   anio+1;
    } else {
        //En cualquier otro caso es una semana del año actual.
        semana   =   Math.floor(n/7)+1;
    };

    return semana //La función retorna una cadena de texto indicando la semana y el año correspondiente a la fecha ingresada
  }

}
