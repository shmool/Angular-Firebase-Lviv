import { TestBed, inject } from '@angular/core/testing';

import { LvivRecommendationsService } from './lviv-recommendations.service';

describe('LvivRecommendationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LvivRecommendationsService]
    });
  });

  it('should be created', inject([LvivRecommendationsService], (service: LvivRecommendationsService) => {
    expect(service).toBeTruthy();
  }));
});
