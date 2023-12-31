import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as ProductActions from '../../../state/product/product.actions';
import { ProductModalComponent } from 'src/app/shared/product-modal/product-modal.component';
import { Product } from 'src/app/shared/interfaces/data.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'app-actions-button-renderer',
    templateUrl: './actions-button-renderer.component.html',
    imports: [
        CommonModule,
        TranslateModule,
        ProductModalComponent
    ]
})
export class ActionsButtonRendererComponent implements ICellRendererAngularComp {

    private params: any;
    private rowData: Product;

    @ViewChild('editProductModalComponent') editProductModalComponent: ProductModalComponent;

    constructor(private store: Store) { }

    agInit(params: any): void {
        this.params = params;
        this.rowData = this.params.data
    }

    public refresh(): boolean {
        return false;
    }

    public onDelete(): void {
        this.store.dispatch(ProductActions.removeProduct({ id: this.rowData.id }));
    }

    public openProductModal(): void {
        this.editProductModalComponent.openEditModal(this.rowData);
    }

    public updateProduct(updatedProduct): void {
        this.store.dispatch(ProductActions.updateProduct({ product: updatedProduct }));
        this.store.dispatch(ProductActions.loadProducts());
    }
}
