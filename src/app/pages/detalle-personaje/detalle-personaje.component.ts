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
  allEpisodes: any[] = []
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
    const getEpisodes: any[] = []
    this.getDataService.getCharacter(this.id).subscribe((res:any) => { 
      //console.log(res.episode.url.split("/").pop())
      this.detalle = res
      const episodes: string[] = [] 
      res.episode.forEach((episode:any)=> {
        episodes.push(episode.split("/").pop())
      })
      const strEpisodes = episodes.join(',')
      //console.log('ids',strEpisodes)
      this.getDataService.getEpisodes(strEpisodes).subscribe((res: any) => { 
        if(res.length !== undefined){
          this.allEpisodes = res;
        } else{
          this.allEpisodes.push(res)
        }  

        this.swiper.nativeElement.swiper.activeIndex = this.index;
        Object.assign(this.swiper.nativeElement, this.swiperConfig);
        this.swiper.nativeElement.initialize();
      }, error => {
        //console.log('no hay episodios registrados')
        this.allEpisodes = []
      })
    })
  }
 

}
