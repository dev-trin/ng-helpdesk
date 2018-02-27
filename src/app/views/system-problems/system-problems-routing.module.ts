import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsModule } from '../system-problems/problems/problems.module';
import { ListDataModule } from './list-data/list-data.module';
const routes: Routes = [
    {
        path: '',
        data: {
            title: 'รายการแจ้งปัญหา',
            status: true
        },
        children: [
            {
                path: 'problems',
                loadChildren: './problems/problems.module#ProblemsModule'
            },
            {
                path: 'list-data',
                loadChildren: './list-data/list-data.module#ListDataModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemProblemsRoutingModule {}