import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { BodyAdminComponent } from './backOffice/body-admin/body-admin.component';
import { AllTemplateUserComponent } from './frontOffice/all-template-user/all-template-user.component';
import { BodyUserComponent } from './frontOffice/body-user/body-user.component';
import { ToolsOffersComponent } from './frontOffice/tools-offers/tools-offers.component';
import { AddToolsComponent } from './frontOffice/add-tools/add-tools.component';
import { ToolDetailsComponent } from './frontOffice/tool-details/tool-details.component';
import { ToolResolverService } from './frontOffice/services/tool-resolver.service';
import { CartComponent } from './frontOffice/cart/cart.component';
import { DashBoardComponent } from './backOffice/dash-board/dash-board.component';
import { PromotionComponent } from './backOffice/promotion/promotion.component';

const routes: Routes = [
  {
    path:'admin',
    component:AllTemplateAdminComponent,
    children:[
      {
        path:'admin',
        component:BodyAdminComponent
      },
      {
        path:'dashBoard',
        component:DashBoardComponent
      },
      {
        path:'promo',
        component:PromotionComponent
      }
    ]
  },
  {
    path:'user',
    component:AllTemplateUserComponent,
    children:[
      {
        path:'user',
        component:BodyUserComponent
      },
      {
        path:'toolsOffer',
        component:ToolsOffersComponent
      },
      {
        path:'addNewTool',
        component:AddToolsComponent
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'moreDetails',
        component:ToolDetailsComponent, resolve:{
          tool: ToolResolverService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
