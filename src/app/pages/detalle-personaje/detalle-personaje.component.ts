import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ICharacter } from 'src/app/models/ICharacter';
import { GetCharactersService } from 'src/app/services/get-characters.service';

@Component({
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.component.html',
  styleUrls: ['./detalle-personaje.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class DetallePersonajeComponent {
  public id!: number;
  detalle!: ICharacter;
  episodes: any[] = []


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

        const pointerScroll = (elem:any) => {

          let isDrag = false;
          
          const toggleDrag = () => isDrag = !isDrag;
          const drag = (ev:any) => isDrag && (elem.scrollLeft -= ev.movementX);
          
          elem.addEventListener("pointerdown", toggleDrag);
          addEventListener("pointerup", toggleDrag);
          addEventListener("pointermove", drag);
        };
        
        document.querySelectorAll(".parent").forEach(pointerScroll);
      })
    })
  }
}
