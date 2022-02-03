import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-page',
  templateUrl: './cadastro-page.component.html',
  styleUrls: ['./cadastro-page.component.scss'],
})
export class CadastroPageComponent implements OnInit {
  public formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.getNovoFormulario();
  }

  private getNovoFormulario(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null],
      categoryId: [null],
      active: [true],
    });
  }
}
