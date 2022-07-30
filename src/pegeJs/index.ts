import axios from "axios";
import * as echarts from 'echarts';
import type { IData } from "../type/index";
import chinaJson from "../assets/china.json";

type EChartsOption = echarts.EChartsOption;

class InteData implements IData {
    areaTree: any[] = []
    chinaDayList: any[] = []
    chinaTotal: any[] = []
    china: any[] = []
    scData: object = {}
    mapType: number = 1
    lineType: number = 1
    lastUpdataTime: string = ''
    name: string = ''
    type: number = 1
}

const getPageList = (list: any[]) => {
    const arr: Array<any[]>[] = [];
    for (let index = 0; index < list.length; index += 30) {
        arr.push(list.slice(index, index + 30))
    }
    return arr
}

const initDataFun = (data:InteData) => {
    var mapDom:Element | null = document.getElementById("map");
    var mapDom2:Element | null = document.getElementById("map2");
    var lineDom: HTMLElement | null = document.getElementById("line");
    var lineDom1: HTMLElement | null = document.getElementById("line1");
    var lineDom2: HTMLElement | null = document.getElementById("line2");
    var optionMap:EChartsOption = {
        // 标题组件
        title: {
            subtext: "单击省份可查看病例数",
        },
        // 提示框组件
        tooltip: {
            trigger: "item",
            formatter: "现有确诊病例<br/>{b} : {c}"
        },
        visualMap: {
            show: false,
        }
    };

    var series = {
        type: "map",
        map: "china",
        colorBy: "series",
        zoom: 1.3,
        top: 80,
        label: {
            show: true,
            color: "#333",
            fontSize: 10,
        },
    }

    var myMap = echarts.init((mapDom as HTMLElement));
    var myMap2 = echarts.init((mapDom as HTMLElement));
    var myLine = echarts.init(lineDom as HTMLElement);
    var myLin1 = echarts.init(lineDom1 as HTMLElement);
    var myLin2 = echarts.init(lineDom2 as HTMLElement);
    echarts.registerMap("china", (chinaJson as any));

    myMap.showLoading();
    axios('/api/ug/api/wuhan/app/data/list-total').then((res:any)=> {
        console.log(res);
        data.areaTree = res.data.data.areaTree;
        data.chinaDayList = res.data.data.chinaDayList;
        data.chinaTotal = res.data.data.chinaTotal;
        data.china = data.areaTree.find((v:any) => v.id === "0").children;
        data.scData = data.china.find((v:any) => v.id === "510000");
        // console.log(data.scData);

        let mapData:any[] = [],
            mapData2: any[] = [],
            lineData: {
                date: any[],
                confirm: any[],
                suspect: any[],
                heal: any[],
                dead: any[],
                storeConfirm: any[],
                store: any[],
            } = {
                date: [],
                confirm: [],
                suspect: [],
                heal: [],
                dead: [],
                storeConfirm: [],
                store: [],
            };
        data.china.map((v:any) => {
            mapData.push({
                name: v.name,
                value: v.total.confirm - v.total.dead - v.total.heal || 0,
            });
            mapData2.push({
                name: v.name,
                value: v.total.confirm,
            });
        });

        data.chinaDayList.map((v: any) => {
            lineData.date.push(v.date);
            lineData.confirm.push(v.total.confirm);
            lineData.suspect.push(v.total.suspect);
            lineData.heal.push(v.total.heal);
            lineData.dead.push(v.total.dead);
            lineData.store.push(v.total.confirm - v.total.dead - v.total.heal);
            lineData.storeConfirm.push(v.total.confirm);
        });

        myMap.hideLoading();
        myMap.setOption({ 
            ...optionMap,
            series: {
                ...series,
                data: mapData
            }
        });
        myMap2.setOption({
            ...optionMap,
            series: {
                ...series,
                data: mapData
            }
        });

        var optionLine = {
            title: {
                text: "全国疫情新增趋势",
                subtext: "单击可查看具体数据",
            },
            tooltip: {
                trigger: "axis",//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                // formatter: "现有确诊病例<br/>{b}: {c} ",
            },
            grid: {
                top: "18%",
                left: "18%", //原来是10%，修改为20%
                right: "2%",
            },
            xAxis: [
                {
                    type: "category",
                    // axisTick: {
                    //     alignWithLabel: true,
                    // },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#a9a9a9",
                        },
                    },
                    axisPointer: {
                        label: {
                            formatter: function (p: any) {
                                return `确诊： ${p.seriesData[0].data}`;
                            },
                        },
                    },
                    data: lineData.date,
                },
                {
                    show: false,
                    type: "category",
                    // axisTick: {
                    //     alignWithLabel: true,
                    // },
                    axisLine: {
                        onZero: false,
                        color: '#a9a9a9'
                    },
                    axisPointer: {
                        label: {
                            formatter: function (p: any) {
                                return `疑似： ${p.seriesData[0].data}`;
                            },
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: "value",
                    //  axisLine: {
                    //   // onZero: false,
                    //   interval: 0,//使x轴文字显示全
                    //   //  rotate:40
                    //   // lineStyle: {
                    //   //   color: colors[1],
                    //   // },
                    // },
                },
            ],
        };
        myLine.setOption({
            ...optionLine,
            series: [
                {
                    type: "line",//
                    xAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            color: "#e44a3d",
                            lineStyle: {
                                color: "#e44a3d",
                            },
                        },
                    },
                    data: lineData.confirm,
                },
                {
                    type: "line",
                    xAxisIndex: 1,
    
                    itemStyle: {
                        normal: {
                            color: "#a31d13",
                            lineStyle: {
                                color: "#a31d13",
                            },
                        },
                    },
                    // smooth: true,
                    // emphasis: {
                    //   focus: 'series'
                    // },
                    data: lineData.suspect,
                },
            ],
        });
        optionLine.title.text = "全国疫情确诊数据";
        myLin1.setOption({
            ...optionLine,
            series: [
                {
                    type: "line",
                    xAxisIndex: 0,
                    itemStyle: {
                        normal: {
                            color: "#a31d13",
                            lineStyle: {
                                color: "#a31d13",
                            },
                        },
                    },
                    data: lineData.storeConfirm,
                },
                {
                    type: "line",
                    xAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: "#ffa352",
                            lineStyle: {
                                color: "#ffa352",
                            },
                        },
                    },
                    data: lineData.store,
                },
            ],
        });
        optionLine.title.text = "全国疫情治愈数据";
        myLin2.setOption({
            ...optionLine,
            series: [
                {
                    type: "line",
                    xAxisIndex: 0,
                    data: lineData.heal,
                },
                {
                    type: "line",
                    xAxisIndex: 1,
                    // smooth: true,
                    // emphasis: {
                    //   focus: 'series'
                    // },
                    data: lineData.dead,
                },
            ],
        });

    });
}

export {
    InteData,
    initDataFun
}
