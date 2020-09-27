<template>
    <div class="table">
        <div v-loading="loading" class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width:100%">
            <div class="el-table__header-wrapper">
                <table class="el-table__header" style="width:100%">
                    <thead>
                        <tr>
                            <th class="el-table_1_column_1 is-leaf" colspan="1" rowspan="1" v-for="item in columns" :key="item._id">
                                <div class="cell">{{item.label}}</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table__body-wrapper is-scrolling-none">
                <table class="el-table__body" style="width:100%" v-if="tabledata&&tabledata.length>0">
                    <tbody>
                        <tr class="el-table__row" v-for="item in tabledata" :key="item._id">
                            <td v-for="column in columns" :key="column.label" colspan="1" rowspan="1" >
                                <template v-if="!column.tpl">
                                    <div class="cell">{{item[column.prop]}}</div>
                                </template>
                                <template v-else>
                                    <div class="cell">
                                        <slot :name="column.tpl" :data="item"></slot>
                                    </div>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="nodata color-3" v-if="!tabledata || tabledata.length == 0">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg0IiBoZWlnaHQ9IjE1MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDMxLjY3KSI+PGVsbGlwc2UgZmlsbC1vcGFjaXR5PSIuOCIgZmlsbD0iI0Y1RjVGNyIgY3g9IjY3Ljc5NyIgY3k9IjEwNi44OSIgcng9IjY3Ljc5NyIgcnk9IjEyLjY2OCIvPjxwYXRoIGQ9Ik0xMjIuMDM0IDY5LjY3NEw5OC4xMDkgNDAuMjI5Yy0xLjE0OC0xLjM4Ni0yLjgyNi0yLjIyNS00LjU5My0yLjIyNWgtNTEuNDRjLTEuNzY2IDAtMy40NDQuODM5LTQuNTkyIDIuMjI1TDEzLjU2IDY5LjY3NHYxNS4zODNoMTA4LjQ3NVY2OS42NzR6IiBmaWxsPSIjQUVCOEMyIi8+PHBhdGggZD0iTTEwMS41MzcgODYuMjE0TDgwLjYzIDYxLjEwMmMtMS4wMDEtMS4yMDctMi41MDctMS44NjctNC4wNDgtMS44NjdIMzEuNzI0Yy0xLjU0IDAtMy4wNDcuNjYtNC4wNDggMS44NjdMNi43NjkgODYuMjE0djEzLjc5Mmg5NC43NjhWODYuMjE0eiIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMuNTYpIi8+PHBhdGggZD0iTTMzLjgzIDBoNjcuOTMzYTQgNCAwIDAgMSA0IDR2OTMuMzQ0YTQgNCAwIDAgMS00IDRIMzMuODNhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTR6IiBmaWxsPSIjRjVGNUY3Ii8+PHBhdGggZD0iTTQyLjY3OCA5Ljk1M2g1MC4yMzdhMiAyIDAgMCAxIDIgMlYzNi45MWEyIDIgMCAwIDEtMiAySDQyLjY3OGEyIDIgMCAwIDEtMi0yVjExLjk1M2EyIDIgMCAwIDEgMi0yek00Mi45NCA0OS43NjdoNDkuNzEzYTIuMjYyIDIuMjYyIDAgMSAxIDAgNC41MjRINDIuOTRhMi4yNjIgMi4yNjIgMCAwIDEgMC00LjUyNHpNNDIuOTQgNjEuNTNoNDkuNzEzYTIuMjYyIDIuMjYyIDAgMSAxIDAgNC41MjVINDIuOTRhMi4yNjIgMi4yNjIgMCAwIDEgMC00LjUyNXpNMTIxLjgxMyAxMDUuMDMyYy0uNzc1IDMuMDcxLTMuNDk3IDUuMzYtNi43MzUgNS4zNkgyMC41MTVjLTMuMjM4IDAtNS45Ni0yLjI5LTYuNzM0LTUuMzZhNy4zMDkgNy4zMDkgMCAwIDEtLjIyMi0xLjc5VjY5LjY3NWgyNi4zMThjMi45MDcgMCA1LjI1IDIuNDQ4IDUuMjUgNS40MnYuMDRjMCAyLjk3MSAyLjM3IDUuMzcgNS4yNzcgNS4zN2gzNC43ODVjMi45MDcgMCA1LjI3Ny0yLjQyMSA1LjI3Ny01LjM5M1Y3NS4xYzAtMi45NzIgMi4zNDMtNS40MjYgNS4yNS01LjQyNmgyNi4zMTh2MzMuNTY5YzAgLjYxNy0uMDc3IDEuMjE2LS4yMjEgMS43ODl6IiBmaWxsPSIjRENFMEU2Ii8+PC9nPjxwYXRoIGQ9Ik0xNDkuMTIxIDMzLjI5MmwtNi44MyAyLjY1YTEgMSAwIDAgMS0xLjMxNy0xLjIzbDEuOTM3LTYuMjA3Yy0yLjU4OS0yLjk0NC00LjEwOS02LjUzNC00LjEwOS0xMC40MDhDMTM4LjgwMiA4LjEwMiAxNDguOTIgMCAxNjEuNDAyIDAgMTczLjg4MSAwIDE4NCA4LjEwMiAxODQgMTguMDk3YzAgOS45OTUtMTAuMTE4IDE4LjA5Ny0yMi41OTkgMTguMDk3LTQuNTI4IDAtOC43NDQtMS4wNjYtMTIuMjgtMi45MDJ6IiBmaWxsPSIjRENFMEU2Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ5LjY1IDE1LjM4MykiIGZpbGw9IiNGRkYiPjxlbGxpcHNlIGN4PSIyMC42NTQiIGN5PSIzLjE2NyIgcng9IjIuODQ5IiByeT0iMi44MTUiLz48cGF0aCBkPSJNNS42OTggNS42M0gwTDIuODk4LjcwNHpNOS4yNTkuNzA0aDQuOTg1VjUuNjNIOS4yNTl6Ii8+PC9nPjwvZz48L3N2Zz4=" alt="">
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
        <el-pagination v-if="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            :hide-on-single-page="true">
        </el-pagination> 
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { TabaData } from './datamodel/Table';
    @Component({}) 
    export default class Table extends Vue {
        @Prop() tableData;
        @Prop() columns;
        @Prop() loading;
        @Emit() loadData(v: TabaData) {};
        pagination: TabaData = {};
        tabledata: [] = [];

        @Watch('tableData') 
        tableDatachanged(v) {
            if(v.content) {
                this.tabledata = v.content;
                this.pagination = v;
            }else {
                this.tabledata = v;
            }
        }

        handleCurrentChange(e) {
            this.loadData({
                currentPage: e,
                size: this.pagination.size
            })
        }

        handleSizeChange(e) {
            this.loadData({
                currentPage: this.pagination.currentPage,
                size: e
            })
        }

        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
            return 'success-row';
            }
            return '';
        }

        getrow(row){
            return row;
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/styles/public.scss';
.table{
    .nodata{
        padding: 20px 0;
        text-align: center;
    }
}
/deep/ {
    .el-pagination{
        text-align: right;
    }
}
</style>