<template>
  <div id="app">
    <table-view :config="config">
      <template #toolsBar>
        <el-button size="mini">Tools</el-button>
      </template>
    </table-view>
  </div>
</template>

<script lang="tsx">
import TableView, { OperationType, Align, BaseFormType, CheckboxChangedRecords, SelectData } from 'vue-table-view';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Config, ListDataWrapper } from 'vue-table-view/src/config';
import { CreateElement, VNode } from 'vue';
import axios from 'axios';
import { Tag, Message, Button } from 'element-ui';

interface RequestData {
  pageNum: number;
  pageSize: number;
  id?: number;
  name?: string;
  remark?: string;
  status?: number;
  remoteStatus?: string;
  date?: string;
  dateRange?: [string, string];
  time?: string;
  timeRange?: [string, string];
}

type ListDataStatus = 0 | 1 | 2 | 3;

export interface ListData {
  id: number;
  name: string;
  date: string;
  status: ListDataStatus;
}

export const StatusMap: Record<ListDataStatus, string> = {
  0: "Not Ready",
  1: "Success",
  2: "Fail",
  3: "Paused",
};

@Component({
  components: {
    TableView,
    'el-button': Button
  }
})
export default class App extends Vue {
  public config: Config<ListData, RequestData> = {
    height: "100%",
    needCheckbox: true,
    needRadio: true,
    columns: [
      {
        field: "id",
        title: "ID",
        fixed: true,
      },
      {
        field: "name",
        title: "Name",
      },
      {
        field: "date",
        title: "Date",
        format: (val: number): string => {
          const d = new Date();
          d.setTime(val);
          return d.toDateString();
        },
      },
      {
        field: "status",
        title: "Status",
        align: Align.Center,
        render: (
          h: CreateElement,
          val: ListDataStatus
        ): VNode => <Tag>{StatusMap[val]}</Tag>,
      },
    ],
    getListFunc: (params: RequestData): Promise<ListDataWrapper<ListData>> => {
      return new Promise((resolve) => {
        axios
          .post<ListDataWrapper<ListData>>("/mock/list", params)
          .then((res) => {
            resolve(res.data);
          });
      });
    },
    advancedSearch: [
      {
        field: "name",
        title: "name",
        placeholder: true,
        type: BaseFormType.String,
        default: "",
        colSpan: 24,
        extraConfig: {
          suffixIcon: 'el-icon-search'
        }
      },
      {
        field: "id",
        title: "id",
        placeholder: true,
        type: BaseFormType.Number,
        default: null,
        extraConfig: {
          min: 0,
          max: 5,
        },
      },
      {
        field: "status",
        title: "status",
        placeholder: "Please Select",
        type: BaseFormType.Select,
        default: null,
        extraConfig: {
          selectData: [
            { label: "Pending", value: 0 },
            { label: "Success", value: 1 },
            { label: "Fail", value: 2 },
          ],
        },
      },
      {
        field: "remoteStatus",
        title: "remote-status",
        placeholder: "Please Select",
        type: BaseFormType.Select,
        default: null,
        extraConfig: {
          async: true,
          filterable: true,
          asyncFunc: async (search?: string): Promise<SelectData[]> => {
            return new Promise((resolve) => {
              axios
                .post<ListDataWrapper<SelectData>>("/mock/remote-status-list", {
                  search,
                })
                .then((res) => {
                  resolve(res.data.list as SelectData[]);
                });
            });
          },
        },
      },
      {
        field: "date",
        title: "date",
        placeholder: "Please Choose",
        type: BaseFormType.DatePicker,
        default: "",
        extraConfig: {
          format: "yyyy-MM-dd",
        },
      },
      {
        field: "dateRange",
        title: "date-range",
        type: BaseFormType.DateRangePicker,
        default: ["", ""],
        extraConfig: {
          format: "yyyy-MM-dd",
        },
      },
      {
        field: "time",
        title: "time",
        placeholder: "Please Choose",
        type: BaseFormType.TimePicker,
        default: "",
        extraConfig: {
          format: "HH:mm",
        },
      },
      {
        field: "timeRange",
        title: "time-range",
        type: BaseFormType.TimeRangePicker,
        default: ["", ""],
        extraConfig: {
          format: "HH:mm",
        },
      },
      {
        field: "remark",
        title: "remark",
        placeholder: true,
        type: BaseFormType.Textarea,
        default: "",
      },
    ],
    operationConfig: {
      operations: [
        {
          type: OperationType.ButtonWithIcon,
          icon: "el-icon-view",
          status: "primary",
          onClick: (row: ListData): void => {
            Message.info(`View Id: ${row.id.toString()}`);
          },
        },
        {
          type: OperationType.ButtonWithIcon,
          icon: "el-icon-edit",
          onClick: (row: ListData): void => {
            Message.info(`Edit Id: ${row.id.toString()}`);
          },
        },
        {
          type: OperationType.Button,
          label: "Edit",
          onClick: (row: ListData): void => {
            Message.success(`Edit Id: ${row.id.toString()}`);
          },
        },
        {
          type: OperationType.Link,
          label: "Delete",
          status: "danger",
          disabled: (row: ListData): boolean => row.status === 2,
          onClick: (row: ListData): void => {
            Message.error(`Delete Id: ${row.id.toString()}`);
          },
        },
        {
          type: OperationType.LinkWithoutUnderline,
          label: "Config",
          onClick: (row: ListData): void => {
            Message.success(`Config Id: ${row.id.toString()}`);
          },
        },
        {
          type: OperationType.LinkMore,
          label: "More",
          disabled: (row: ListData): boolean => row.status === 3,
          children: [
            {
              label: "More 1",
              onClick: (row: ListData): void => {
                Message.info(`More 1 Id: ${row.id.toString()}`);
              },
            },
            {
              label: "More 2",
              divided: true,
              onClick: (row: ListData): void => {
                Message.info(`More 2 Id: ${row.id.toString()}`);
              },
            },
            {
              label: "More 3",
              disabled: (row: ListData): boolean => row.id % 2 === 0,
              onClick: (row: ListData): void => {
                Message.info(`Even Id: ${row.id.toString()}`);
              },
            },
          ],
        },
        {
          type: OperationType.ButtonMore,
          label: "More",
          children: [
            {
              label: "More 1",
              onClick: (row: ListData): void => {
                Message.info(`More 1 Id: ${row.id.toString()}`);
              },
            },
          ],
        },
        {
          type: OperationType.ButtonWithIconMore,
          icon: "el-icon-more",
          children: [
            {
              label: "More 1",
              onClick: (row: ListData): void => {
                Message.info(`More 1 Id: ${row.id.toString()}`);
              },
            },
          ],
        },
      ],
      width: "400px",
      surroundByButtonGroup: true,
    },
    onCheckboxChange: this.onCheckboxChange,
    onRadioChange: this.onRadioChange,
  };

  public checkedRows: ListData[] = [];

  @Watch("checkedRows")
  public onCheckedRowsChanged(val: ListData[]): void {
    Message.warning(`已勾选${val.length}条数据`);
  }

  public onCheckboxChange(records: CheckboxChangedRecords<ListData>): void {
    this.checkedRows = records.records;
    console.log(records);
  }

  public onRadioChange(row: ListData): void {
    console.log(row);
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>
