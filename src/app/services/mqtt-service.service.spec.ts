import { TestBed } from '@angular/core/testing';

import { MqttServiceService } from './mqtt-service.service';

describe('MqttServiceService', () => {
  let service: MqttServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
