import { TestBed } from '@angular/core/testing';
import { GradientConfigService } from './gradient-config.service';
describe('GradientConfigService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GradientConfigService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=gradient-config.service.spec.js.map