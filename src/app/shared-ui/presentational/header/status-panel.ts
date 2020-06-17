import { Component, Input } from "@angular/core";

@Component({
    selector: 'status-panel',
    template: `
        <div style="display: inline-flex">
            <div>Accounts: {{accountsAmount}}</div>
            <div>Categories: {{categoriesAmount}}</div>
        </div>
    `
})
export class StatusPanel {
    @Input()
    accountsAmount: number;
    @Input()
    categoriesAmount: number;
}