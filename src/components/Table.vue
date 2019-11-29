<template>
    <div class="table">
        <!-- <el-table
            :data="tableData"
            style="width: 100%"
            :stripe="true"
            row-key="rowdata"
            :row-class-name="tableRowClassName">
            <el-table-column v-for="(item) in columns" :key="item._id"
              :prop="item.prop"
              :label="item.label"
              :width="item.width">
              <slot v-if="item.tpl" :name="item.tpl" :data="rowdata"></slot>
            </el-table-column>
        </el-table> -->
        <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width:100%">
            <div class="el-table__header-wrapper">
                <table class="el-table__header" style="width:100%">
                    <thead>
                        <tr>
                            <th class="el-table_1_column_1     is-leaf" colspan="1" rowspan="1" v-for="item in columns" :key="item._id">
                                <div class="cell">{{item.label}}</div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="el-table__body-wrapper is-scrolling-none">
                <table class="el-table__body" style="width:100%">
                    <tbody>
                        <tr class="el-table__row" v-for="item in tableData" :key="item._id">
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
            </div>
        </div>
        <el-pagination v-if="tableData.content"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination> 
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component({}) 
    export default class Table extends Vue {
        @Prop() tableData;
        @Prop() columns;
        pagination: any = {
            total: 0,
            size: 10,
            currentPage: 1
        }
        created() {
            if(this.tableData.content) {
                this.tableData = this.tableData.content;
                this.pagination = this.tableData;
            }
        }

        handleCurrentChange(e) {
            console.log(e)
        }

        handleSizeChange(e) {
            console.log(e)
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