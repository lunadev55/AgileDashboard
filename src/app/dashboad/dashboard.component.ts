import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboad',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, 
            CommonModule,
            BaseChartDirective]
})
export class DashboardComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Food' }
  ];

  products = [
    { id: 1, categoryId: 1, name: 'Smartphone' },
    { id: 2, categoryId: 1, name: 'TV' },
    { id: 3, categoryId: 2, name: 'Shirt' },
    { id: 4, categoryId: 3, name: 'Pizza' }
  ];

  brands = [
    { id: 1, productId: 1, name: 'Apple' },
    { id: 2, productId: 1, name: 'Samsung' },
    { id: 3, productId: 2, name: 'Sony' },
    { id: 4, productId: 3, name: 'Nike' },
    { id: 5, productId: 4, name: 'Domino’s' }
  ];

  salesData: { [key: number]: { brandId: number; sales: number[] } } = {
    1: { brandId: 1, sales: [100, 150, 120, 130] }, 
    2: { brandId: 2, sales: [90, 110, 115, 125] },  
    3: { brandId: 3, sales: [80, 95, 100, 105] },   
    4: { brandId: 4, sales: [70, 85, 90, 100] },    
    5: { brandId: 5, sales: [60, 75, 115, 95] }      
  };

  selectedCategory?: number;
  selectedProduct?: number;
  selectedBrand?: number;

  filteredProducts: { id: number; categoryId: number; name: string }[] = [];
  filteredBrands: { id: number; productId: number; name: string }[] = [];

  chartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [{ data: [], label: 'Sales' }]
  };
  chartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  chartType: 'line' = 'line';

  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.filteredBrands = [...this.brands];
  }

  onCategoryChange(event: Event) {
    const categoryId = Number((event.target as HTMLSelectElement).value);
    this.filteredProducts = this.products.filter(product => product.categoryId == +categoryId);
    this.filteredBrands = [];
    this.selectedProduct = undefined;
    this.selectedBrand = undefined;

    this.chartData = {
      labels: this.chartData.labels,
      datasets: [{ data: [], label: 'Sales' }]
    };
  }

  onProductChange(event: Event) {
    const productId = Number((event.target as HTMLSelectElement).value);
    this.filteredBrands = this.brands.filter(brand => brand.productId == +productId);
    this.selectedBrand = undefined;

    this.chartData = {
      labels: this.chartData.labels,
      datasets: [{ data: [], label: 'Sales' }]
    };
  }

  onBrandChange(event: Event) {
    const brandId = Number((event.target as HTMLSelectElement).value);
    const sales = this.salesData[brandId]?.sales;

    this.chartData = {
      labels: this.chartData.labels,
      datasets: [{ data: sales ?? [], label: 'Sales' }]
    };
  }
}
