import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: String[] = ['position','image','name','delete'];
  data:any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  pokemon = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;



  constructor(private PokemonService: PokemonService){}

  ngOnInit(): void {
    this.obtenerPokemon();
  }

  obtenerPokemon(){
    let pokemonData;
    for (let index = 0; index < 152; index++) {
      
        this.PokemonService.obtenerPokemon(index).subscribe(
          res => {
            pokemonData = {
              position:index,
              image:res.sprites.front_default,
              name: res.name
            }
            this.data.push(pokemonData);
            this.dataSource = new MatTableDataSource<any>(this.data)
            this.dataSource.paginator = this.paginator;
            console.log(res);
          },
          err=>{
            console.log(err)
          }
        );
      
      
    }
    
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    capitalizeFirstLetter(row: any) {
      const name = row.name;
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      return capitalized;
    }

    deleteRow(row: any) {
      const index = this.data.indexOf(row); // Obtener el índice del elemento en el array de datos
      if (index >= 0) {
        this.data.splice(index, 1); // Eliminar el elemento del array
        this.dataSource = new MatTableDataSource(this.data); // Actualizar el origen de datos de la tabla
      }
    }
    getRow(row:any){
      console.log(row);
      
    }
    
}
