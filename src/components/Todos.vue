<template>
    <section>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="8" md="8">
                    <v-text-field
                        v-model="title"
                        :counter="10"
                        label="Enter what todo"
                        required
                    ></v-text-field>
                    </v-col>
 
                    <v-col cols="4" md="4">
                        <v-btn class="ma-2 red white--text" @click="addItem">
                            Add
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-list dense>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="todo in todos" :key="todo.id">
                                    <v-list-item-content>
                                        <v-list-item-subtitle>
                                            <v-row>
                                                <v-col cols="2" md="2">
                                                    <v-btn @click="removeItem(todo)">X</v-btn>
                                                </v-col>
                                                <v-col cols="8" md="8">
                                                    <v-chip color="red" text-color="white">
                                                    {{todo.title}}
                                                    </v-chip>
                                                </v-col>
                                                <v-col cols="2" md="2">
                                                    <v-switch value :input-value="todo.isCompleted==1?true:false"
                                                        @change="updateItem(todo,$event)"></v-switch>
                                                </v-col>
                                            </v-row>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </section>
</template>
 
<script>
import axios from 'axios';
 
export default {
    data: () => ({
        drawer: null,
        snackbar:false,
        valid: true,
        title: "",
        message: "",
        checkboxes:[]
    }),
    created: function () {
        axios.get("http://localhost:8000/api/todo", {
            headers: {
                Authorization: 'Bearer ' + this.$store.state.token
            }
        })
        .then(response => {
            this.$store.state.todo.listData=response.data;
        });
    },
    computed: {
        todos(){
            return this.$store.state.todo.listData;
        }
    },
    methods: {
        addItem() {
            axios.post("http://localhost:8000/api/todo", {
                title:this.title,
                user_id:this.$store.state.user.id
            },
            {
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.token
                }
            })
            .then(response => {
                this.message = response.data.status;
                this.$store.dispatch('todo/save_row', {
                    row:response.data.row,
                });
            });
        },
        updateItem(row, value) {
            axios.put("http://localhost:8000/api/todo/"+row.id, {
                isCompleted:value?1:0,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.token
                }
            })
            .then(response => {
                this.message = response.data.message;
                this.$store.dispatch('todo/edit_row', {
                    row: response.data.row
                });
            });
        },
        removeItem(row) {
            axios.delete("http://localhost:8000/api/todo/"+row.id,
            {
                headers: {
                    Authorization: 'Bearer ' + this.$store.state.token
                }
            })
            .then(response => {
                this.message = response.data.message;
                this.$store.dispatch('todo/remove_row', {
                    row: row,
                });
            });
        },
    }
}
</script>