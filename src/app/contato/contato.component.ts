import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ConstantPool } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog'
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component'



@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ['foto','id', 'nome', 'email', 'favorito'];


  constructor(
    private service : ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  favoritar(contato: Contato){
    this.service.favourite(contato).subscribe(response =>{
      contato.favorito = !contato.favorito;
    })
  }

  listarContatos(){
    this.service.list().subscribe(response =>{
      this.contatos = response;
    })
  }

  submit(){

    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);

    this.service.save(contato).subscribe(resposta =>{
      let lista: Contato[] = [... this.contatos, resposta]
      this.contatos = lista;
    })
  }

  uploadFoto(event, contato){
    const files = event.target.files;

    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
        .upload(contato, formData)
        .subscribe(response => this.listarContatos());
    }
  }

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent,{
      width: '400px',
      height: '450px',
      data: contato
    } );

  }

}
