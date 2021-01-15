import { MqttServiceService } from '../services/mqtt-service.service';
import { Chart } from 'chart.js';
import { Component, ViewChild, ElementRef } from "@angular/core";
import { timer } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
      
  @ViewChild("batteryCanvas") batteryCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  @ViewChild("barCanvas") barCanvas: ElementRef;

  private barChart: Chart;
  private barChart1: Chart;
  private doughnutChart: Chart;

  private toiletBattery;
  private diningBattery;
  private bedroomBattery;
  private kitchenBattery;
  private livingBattery;
  private bedroomMotionTimes;
  private kitchenMotionTimes;
  private diningMotionTimes;
  private livingMotionTimes;
  private toiletMotionTimes;

  constructor(private mqttService: MqttServiceService){}

  
  ngAfterViewInit() {
    timer(0,10000)
    .subscribe(() => {
      console.log("Every 10s");
      this.bedroomMotionTimes = this.mqttService.getbedroomMotionTimes();
      console.log("bedroom" + this.bedroomMotionTimes);
      this.kitchenMotionTimes = this.mqttService.getkitchenMotionTimes();
      console.log("kitchen" + this.kitchenMotionTimes);
      this.diningMotionTimes = this.mqttService.getdiningMotionTimes();
      console.log("dining" + this.diningMotionTimes);
      this.livingMotionTimes = this.mqttService.getlivingMotionTimes();
      console.log("living" + this.livingMotionTimes);
      this.toiletMotionTimes = this.mqttService.gettoiletMotionTimes();
      console.log("toilet" + this.toiletMotionTimes);
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

    this.barChart1 = new Chart(this.barCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["bedroom", "kitchen", "dining", "living", "toilet"],
        datasets: [
          {
            label: "Motion Analyser", 
            data: [this.bedroomMotionTimes, this.kitchenMotionTimes, this.diningMotionTimes, this.livingMotionTimes,
                   this.toiletMotionTimes],
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
  }
}
