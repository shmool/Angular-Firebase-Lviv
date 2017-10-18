import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Injectable()
export class LvivRecommendationsService {
  recommendations$;

  constructor(private afDb: AngularFireDatabase) {
    this.recommendations$ = afDb.list('/Lviv');

  }

  save(recommendation) {
    this.recommendations$.push({ title: recommendation });
  }

  update(key: string, newVal: string) {
    this.afDb.object(`/Lviv/${key}`).update({title: newVal});
  }

}
