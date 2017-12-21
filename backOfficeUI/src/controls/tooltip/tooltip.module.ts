import { NgModule } from '@angular/core';
import { ShowTooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { CaCommonModule } from '../common/ca-common.module';

@NgModule({
              imports: [CaCommonModule],
              declarations: [
                  ShowTooltipDirective,
                  TooltipComponent
              ],
              exports: [
                  ShowTooltipDirective,
                  TooltipComponent
              ]
          })

export class TooltipModule {}