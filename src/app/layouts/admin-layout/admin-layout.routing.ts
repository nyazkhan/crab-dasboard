import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { BloggerComponent } from 'src/app/blogger/blogger.component';
export const AdminLayoutRoutes: Routes = [
    {

        path: '', component: AdminLayoutComponent,
        children: [

            // { path: "edit", component: EditUserDetailsComponent },

            {
                path: 'blogger', component: BloggerComponent,

            },
            // src\app\Modules\blogger\blogger.module.ts
            // {
            //     path: 'installation', loadChildren: '../../Modules/installation/installation.module#InstallationModule',

            // },
            // {
            //     path: 'manager', loadChildren: '../../Modules/brandManager/brand-manager.module#BrandManagerModule',

            // },
            // {
            //     path: 'engineer', loadChildren: '../../Modules/serviceEngineer/service-engineer.module#ServiceEngineerModule',

            // },

            {
                path: 'dashboard', component: DashboardComponent,


            },
        ]
    }
];
