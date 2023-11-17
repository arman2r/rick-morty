import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ICharacter, IPaginate } from 'src/app/models/ICharacter';
import { GetCharactersService } from 'src/app/services/get-characters.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ItemListComponent]
})
export class PersonajesComponent implements AfterViewInit {
  @ViewChild('spinner') spinner!: ElementRef
  @ViewChild('listCharacters') listCharacters!: ElementRef
  characters: ICharacter[] = [];
  isShowSpinner = true;
  isLoading = true;
  page = 1;
  openMenu = false; 

  constructor(private characterService: GetCharactersService) { }

  ngOnInit() {
    this.getAllCharacters()
  }

  ngAfterViewInit(): void {
    //console.log('spinner', this.spinner)
  }

  getAllCharacters(page?: number) {
    this.isLoading=true;
    //console.log('pagina',this.page) 
    this.characterService.getCharacters(this.page).subscribe((res: IPaginate)=> {
      //console.log(res.results)
      res.results?.forEach((item)=>{
        this.characters.push(item);
      }) 
      this.page++
      //console.log('characters', this.characters)
      
      setTimeout(() => {
        this.itemStatus(true) 
      }, 3000);

      setTimeout(() => {
        this.isLoading=false; 
      }, 10000);

    })
  }

  openSubmenu($btnSubmenu: HTMLElement){
    //console.log($btnSubmenu.offsetHeight)
    this.openMenu = !this.openMenu
  }

  itemStatus(status: any) {
    //console.log('entro aquiii')
    if (status) {
      this.isShowSpinner = false
    }
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(event:any){
    //console.log('altura', window.innerHeight+window.scrollY, document.body.scrollHeight)
    if(window.innerHeight+window.scrollY>=document.body.scrollHeight - 2){
      //console.log('cumplio',event); 
      this.getAllCharacters()
    }
  }

}
