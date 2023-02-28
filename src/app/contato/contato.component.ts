import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome: String = '';

  constructor(
    private service : ContatoService
  ) { }

  ngOnInit(): void {
    const c : Contato = new Contato();
    c.nome = 'francisco';
    c.email = 'francisco@email.com'
    c.favorito = false;

    this.service.save(c).subscribe(responta =>{
      console.log(responta)
    })
  }

}
