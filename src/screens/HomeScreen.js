import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Content, Item, Input, Label, Button, Text, List, ListItem, Separator} from 'native-base';
import Todo from '../components/Todo';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            todos: [
                {text: 'Nome do Todo', done: false},
                {text: 'Nome do Todo2', done: true},
                {text: 'Nome do Todo3', done: false},
            ],
        };
    }

    handleChangeText(text){
        console.log(text);
        this.setState({
            text: text,
        })
    }

    addTodo(){
        const todos = this.state.todos.slice();
        const text = this.state.text;

        if(text == ''){
            Alert.alert('O nome do todo não pode estar vazio!');
            return;
        }

        for (let i = 0; i < todos.length; i++){
            if(todos[i].text == text && todos[i].done == false){
                Alert.alert('Este nome já está em uso em outro todo!');
                this.setState({
                    text: '',
                })
                return;
            }
        }

        this.setState({
            todos: [... todos, {text: text, done: false}],
            text: '',
        })
    }

    renderTodos(isDone){
        const todos = this.state.todos.map((todo, id) => {
            if(todo.done === isDone){
                return (
                    <Todo 
                        Key={id}
                        text={todo.text}
                        done={todo.done}
                        onPress={() => this.togleTodo(id)}
                    />
                );
            }
        })
        return todos;
    }

    togleTodo(id){
        let todos = this.state.todos.slice();
        
        if(!todos[id].done == false){
            for (let i = 0; i < todos.length; i++){
                if(todos[id].text == todos[i].text && todos[i].done == !todos[id].done){
                    Alert.alert('Este nome já está em uso em outro todo!');
                    this.setState({
                        text: '',
                    })
                    return;  
                }
            }
        }

        todos[id].done = !todos[id].done;
        this.setState({
            todos: todos,
        })
    }

    render(){
        return(
            <Content style={styles.container}>
                <Item stackedLabel>
                    <Label>Digite seu Todo</Label>
                    <Input
                        onChangeText={(text) => this.handleChangeText(text)}
                        value={this.state.text}
                    ></Input>
                </Item>
                <Button 
                    onPress={() => this.addTodo()}
                    style={styles.marginTop} 
                    block
                    success>
                    <Text>Adicionar</Text>
                </Button>
                <List style={styles.marginTop}>
                    <Separator bordered>
                        <Text>To do</Text>
                    </Separator>
                    {this.renderTodos(false)}
                    <Separator bordered>
                        <Text>Done</Text>
                    </Separator>
                    {this.renderTodos(true)}
                </List>
            </Content>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    marginTop: {
        marginTop: 15,
    },
});

export default HomeScreen;