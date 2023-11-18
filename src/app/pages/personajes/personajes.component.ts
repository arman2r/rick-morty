import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable, Subject, catchError, filter, forkJoin, map, of } from 'rxjs';
import { ItemListComponent } from 'src/app/components/item-list/item-list.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ICharacter } from 'src/app/models/ICharacter';
import { IPaginate } from 'src/app/models/IPaginateProperties';
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
  openMenu2 = false;
  errorSearch = false;
  data$!: Observable<any>;
  private error$ = new Subject<any>();
  showCancel = false;

  constructor(private characterService: GetCharactersService) { }

  ngOnInit() {
    this.getAllCharacters()
  }

  ngAfterViewInit(): void {
    //console.log('spinner', this.spinner)
  }

  getAllCharacters(page?: number) {
    this.isLoading = true;
    //console.log('pagina',this.page) 
    this.characterService.getCharacters(this.page).subscribe((res: IPaginate) => {
      //console.log(res.results)
      res.results?.forEach((item) => {
        this.characters.push(item);
      })
      this.page++
      //console.log('characters', this.characters)

      setTimeout(() => {
        this.itemStatus(true)
      }, 3000);

      setTimeout(() => {
        this.isLoading = false;
      }, 10000);

    })
  }

  openSubmenu($btnSubmenu: HTMLElement) {
    //console.log($btnSubmenu.offsetHeight)
    this.openMenu = !this.openMenu;
    this.openMenu2 = false
  }


  openSubmenuTwo($btnSubmenu: HTMLElement) {
    //console.log($btnSubmenu.offsetHeight)
    this.openMenu = false;
    this.openMenu2 = !this.openMenu2
  }

  itemStatus(status: any) {
    //console.log('entro aquiii')
    if (status) {
      this.isShowSpinner = false
    }
  }

  search(value: any) {
    console.log('consulta', value)
    if (value.length !== 0) {
      forkJoin({
        first: this.characterService.getData(value).pipe(this.handleRequest().bind(this)),
        second: this.characterService.getData2(value).pipe(this.handleRequest().bind(this))
      }).pipe(
        map((result) => {
          console.log('Final Object', result);
          return Object.values(result);
        })
      ).subscribe(res => {
        console.log(res)
        res.map(item => {
          if (item !== null) {
            this.characters = []
            var getPageParam = item.info.next.substring(item.info.next.indexOf('?'), item.info.next.indexOf('&'))
            this.page = getPageParam.substring(getPageParam.indexOf('=') + 1) + 1
            console.log('el item', this.page)
            item.results?.forEach((result: ICharacter) => {
              this.characters.push(result);
            })
          }
        })
      });
    }
  }

  handleRequest() {
    return (observable: Observable<any>) => {
      return observable.pipe(
        map((result) => {
          console.log('Each User Data Object', result);
          return result;
        }),
        catchError((err) => {
          this.error$.next(err);
          return of(null);
        })
      );
    };
  }

  cancelSearch(filterSearch: HTMLInputElement) {
    filterSearch.value = ''
    this.characters = []
    this.page = 1
    this.getAllCharacters()
  }


  selectedCriteria: any[] = []
  selectedCriteriaTwo: any[]  = []
  isSelected(tipoParam: string, event: string) {
    
    if(tipoParam === 'gender='){
      this.selectedCriteria = [] 
      this.selectedCriteria.push('gender='+event); 
    } else {
      this.selectedCriteriaTwo = [] 
      this.selectedCriteriaTwo.push('status='+event); 
    }
    const getCriteria = this.selectedCriteria.concat(this.selectedCriteriaTwo).join('&');

      
    this.characterService.getDataCriteria(getCriteria).subscribe(res => {
      console.log('que llega', res)
      this.characters = []
      res.results?.forEach((result: ICharacter) => {
        this.characters.push(result);
      })
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    //console.log('altura', window.innerHeight+window.scrollY, document.body.scrollHeight)
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      //console.log('cumplio',event); 
      this.getAllCharacters()
    }
  }

}
