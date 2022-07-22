import axios from "axios";
import * as echarts from 'echarts';
import type { IData } from "../type/index";

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

const initDataFun = (data:InteData) => {
    axios('/api/ug/api/wuhan/app/data/list-total').then((res:any)=> {
      console.log(res);
      data.areaTree = res.data.data.areaTree;
      data.chinaDayList = res.data.data.chinaDayList;
      data.chinaTotal = res.data.data.chinaTotal;
      data.china = data.areaTree.find((v:any) => v.id === "0").children;
      data.scData = data.china.find((v:any) => v.id === "510000");
      console.log(data.scData);
    });
}

export {
    InteData,
    initDataFun
}
