/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { Category, Hero } from 'src/app/cadastro/interfaces/cadastro.dto';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  storage: SQLiteObject;
  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastCtrl: ToastController,
    public loading: LoadingService
  ) {
    this.platform
      .ready()
      .then(() => {
        this.createDatabase();
      })
      .catch((error) => {
        alert(error);
      });
  }

  public getDB() {
    return this.sqlite.create({
      name: 'hero.db',
      location: 'default',
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.storage = db;
        this.createTables(db);
      })
      .catch((e) => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch([
      [
        'CREATE TABLE IF NOT EXISTS hero (Id integer primary key AUTOINCREMENT NOT NULL, Name TEXT, CategoryId integer, Active integer)',
      ],
      [
        'CREATE TABLE IF NOT EXISTS categorias (id integer primary key AUTOINCREMENT NOT NULL, Name TEXT)',
      ],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch((e) => console.error('Erro ao criar as tabelas', e));
  }

  public insertCategoria(categoria: Category) {
    const data = [categoria.Name];
    this.storage
      .executeSql(`INSERT INTO categorias (Name) VALUES (?)`, data)
      .then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Categoria salva Offline com sucesso !',
          duration: 4000,
          position: 'middle',
          color: 'success',
        });
        this.loading.dismiss();
        toast.present();
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
  }
  public insertHero(hero: Hero) {
    const data = [hero.Name, hero.CategoryId, hero.Active];
    this.storage
      .executeSql(
        `INSERT INTO hero (Name, CategoryId, Active ) VALUES (?, ? ,?)`,
        data
      )
      .then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Herói salvo Offline com sucesso !',
          duration: 4000,
          position: 'middle',
          color: 'success',
        });
        this.loading.dismiss();
        toast.present();
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
  }
}
