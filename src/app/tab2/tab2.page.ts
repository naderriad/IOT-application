import { MqttServiceService } from '../services/mqtt-service.service';
import { Chart } from 'chart.js';
import { Component, ViewChild, ElementRef } from "@angular/core";
import { timer } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild("batteryCanvas") batteryCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private barChart: Chart;
  private doughnutChart: Chart;

  private toiletBattery;
  private diningBattery;
  private bedroomBattery;
  private kitchenBattery;
  private livingBattery;

  constructor(private mqttService: MqttServiceService){}

  
  ngAfterViewInit() {
    timer(0,10000)
    .subscribe(() => {
      console.log("Every 10s");
       this.toiletBattery = this.mqttService.gettoiletBattery();
       console.log("bedroom" + this.toiletBattery);
       this.diningBattery = this.mqttService.getdiningBattery();
       console.log("kitchen" + this.diningBattery);
       this.bedroomBattery = this.mqttService.getbedroomBattery();
       console.log("dining" + this.bedroomBattery);
       this.kitchenBattery = this.mqttService.getkitchenBattery();
       console.log("living" + this.kitchenBattery);
       this.livingBattery = this.mqttService.getlivingBattery();
       console.log("toilet" + this.livingBattery);
       //console.log(this.lastSeenLocation);
       this.render();
    });
  }

  render() {
    this.barChart = new Chart(this.batteryCanvas.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: ["bedroom", "kitchen", "dining", "living", "toilet"],
        datasets: [
          {
            label: "Battery status for each room", 
            data: [this.bedroomBattery, this.kitchenBattery, this.diningBattery, this.livingBattery,
                   this.toiletBattery],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["bedroom", "kitchen", "dining", "living", "toilet"],
        datasets: [
          {
            label: "Battery Status for each room",
            data: [this.bedroomBattery, this.kitchenBattery, this.diningBattery, this.livingBattery,
              this.toiletBattery],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
  }
}
