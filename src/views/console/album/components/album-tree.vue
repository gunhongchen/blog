<template>
    <div class="album-tree">
        <div v-for="item in fileData" :key="item._id">
            <div class="overflow-hidden mb-20">
                <div class="float-left">
                    <div class="inline-block" v-if="item.type=='FOLDER'">
                        <i class="el-icon-folder color-3 cursor-pointer" v-if="opened.indexOf(item._id)==-1"></i>
                        <i class="el-icon-folder-opened color-3 cursor-pointer" v-if="opened.indexOf(item._id)>-1"></i>
                    </div>
                    <div class="inline-block" v-if="item.type=='FILE'">
                        <i class="el-icon-picture-outline color-3"></i>
                    </div>
                    <div class="inline-block">
                        <p>{{item.name}}</p>
                        <p>{{item.createTime | date}}</p>
                    </div>
                </div>
                <div class="float-right">
                    <el-popconfirm
                        title="确定删除吗？"
                        @onConfirm="deleteData(item)"
                        >
                        <template #reference>
                            <i class="el-icon-delete size-main color-danger cursor-pointer"></i>
                        </template>
                    </el-popconfirm>
                    <el-divider direction="vertical"></el-divider>
                    <i class="el-icon-edit color-3 size-main cursor-pointer"></i>
                    <template v-if="item.type=='FOLDER'">
                        <el-divider direction="vertical"></el-divider>
                        <i class="el-icon-plus color-3 size-main cursor-pointer"></i>
                        <el-divider direction="vertical"></el-divider>
                        <i 
                            class="el-icon-arrow-down color-3 size-main cursor-pointer" 
                            v-if="opened.indexOf(item._id)==-1" 
                            @click="openFolder(item)"></i>
                        <i 
                            class="el-icon-arrow-up color-3 size-main cursor-pointer" 
                            v-if="opened.indexOf(item._id)>-1"
                            @click="closeFolder(item)"></i>
                    </template>
                </div>
            </div>
            <div class="folder-children" v-if="item.type=='FOLDER'&&item.children&&item.children.length>0&&opened.indexOf(item._id)>-1">
                <AlbumTree :fileData="item.children"></AlbumTree>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class AlbumTree extends Vue {
    opened: any = [];
    @Prop() fileData;
    deleteData(v) {
        const data = {
            _id: v._id,
            type: v.type
        }
        console.log(data)
    }
    openFolder(v) {
        this.opened.push(v._id);
    }
    closeFolder(v) {
        this.opened.splice(this.opened.indexOf(v._id),1);
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/styles/public.scss';
i{
    font-size: 50px;
}
.folder-children{
    margin-left: 50px;
}
</style>
