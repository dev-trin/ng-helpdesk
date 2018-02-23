import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProblemsModule } from '../system-problems/problems/problems.module';
const routes: Routes = [
    {
        path: '',
        data: {
            title: 'แจ้งปัญหาระบบ',
            status: false
        },
        children: [
            {
                path: 'problems',
                loadChildren: './problems/problems.module#ProblemsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemProblemsRoutingModule {}