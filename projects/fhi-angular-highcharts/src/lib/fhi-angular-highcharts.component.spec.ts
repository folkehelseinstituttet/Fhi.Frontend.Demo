import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhiAngularHighchartsComponent } from './fhi-angular-highcharts.component';
import { OptionsService } from './services/options.service';
import { TopoJsonService } from './services/topo-json.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DiagramTypeService } from './services/diagram-type.service';
import { TableService } from './services/table.service';

describe('FhiAngularHighchartsComponent', () => {
  let component: FhiAngularHighchartsComponent;
  let fixture: ComponentFixture<FhiAngularHighchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhiAngularHighchartsComponent],
      providers: [
        { provide: OptionsService },
        { provide: TopoJsonService },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: DiagramTypeService },
        { provide: TableService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FhiAngularHighchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
