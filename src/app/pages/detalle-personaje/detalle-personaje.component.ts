import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ICharacter } from 'src/app/models/ICharacter';
import { GetCharactersService } from 'src/app/services/get-characters.service';
import { SwiperContainer, register } from 'swiper/element/bundle'; 
import { SwiperOptions } from 'swiper/types';
import { SwiperDirective } from '../../directives/swiper.directive';

register();

@Component({
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.component.html',
  styleUrls: ['./detalle-personaje.component.scss'], 
  standalone: true,
  imports: [RouterModule, CommonModule, SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DetallePersonajeComponent {
  public id!: number;
  detalle!: ICharacter;
  episodes: any[] = []
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  index = 0
  swiperConfig: SwiperOptions = { 
    mousewheel: {
      forceToAxis: true,
    },
    spaceBetween: 10,
    navigation: true, 
    breakpoints: {
      299: {
        slidesPerView: 1,
      },
      360: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    }
  }

  constructor(private getDataService: GetCharactersService, private router: Router, private routerParam: ActivatedRoute){}

  ngOnInit() { 
    this.id = Number(this.routerParam.snapshot.paramMap.get('id'));
    console.log(this.id)
    const getEpisodes: any[] = []
    this.getDataService.getCharacter(this.id).subscribe((res:any) => {
      console.log(res)
      //console.log(res.episode.url.split("/").pop())
      this.detalle = res
      const episodes: string[] = [] 
      res.episode.forEach((episode:any)=> {
        episodes.push(episode.split("/").pop())
      })
      const strEpisodes = episodes.join(',')
      this.getDataService.getEpisodes(strEpisodes).subscribe((res: any) => {
        //console.log('episodios',res)
        getEpisodes.push(res)
        this.episodes = getEpisodes;
        console.log('episodios', this.episodes)
        /*const characters: any[] = []
        res.map((episode:any) => {
          characters.push(episode.characters[Math.floor(Math.random() * episode.characters.length)].split("/").pop())
        }) 
        //console.log('characters',characters)
        this.getDataService.getCharacter(characters.join(',')).subscribe(personajes => {
          console.log('personajes', personajes)
          console.log('episodes', getEpisodes[0])
          
        })*/
        this.swiper.nativeElement.swiper.activeIndex = this.index;
        Object.assign(this.swiper.nativeElement, this.swiperConfig);
        this.swiper.nativeElement.initialize();
      })
    })
  }
 

}
