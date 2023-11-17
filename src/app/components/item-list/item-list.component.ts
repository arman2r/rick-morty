import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICharacter } from 'src/app/models/ICharacter';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ItemListComponent {
  @Input() results!: ICharacter;
}
