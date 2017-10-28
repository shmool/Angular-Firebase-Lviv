import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';

@Injectable()
export class LvivRecommendationsService {
  recommendationsList;
  recommendations$;

  constructor(private afDb: AngularFireDatabase) {
    this.recommendationsList = afDb.list('/Lviv');
    this.recommendations$ =
      this.recommendationsList.snapshotChanges()
        .map(res => {
          return res.map(rec => ({
              ...rec.payload.val(),
              key: rec.payload.key
            })
          );
        });
  }

  save(recommendation) {
    this.recommendationsList.push({ title: recommendation });
  }

  update(key: string, newVal: string) {
    this.afDb.object(`/Lviv/${key}`).update({ title: newVal });
  }

}
