import React from 'react';

import {StyleSheet, Alert} from 'react-native';
import Todo from '../components/Todo';
import {
  Button,
  Text,
  Content,
  Item,
  Input,
  List,
  Separator,
  Icon,
} from 'native-base';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todos: [
        {text: 'Nome do todo', done: false},
        {text: 'Nome do todo', done: true},
        {text: 'Nome do todo 3', done: true},
      ],
    };
  }

  handleChangeText(text) {
    this.setState({
      text: text,
    });
  }

  addTodo() {
    const todos = this.state.todos.slice();
    const text = this.state.text;

    var found = this.state.todos.find(function (element) {
      return element.text === text && !element.done;
    });

    if (found) {
      Alert.alert(`Já existe um todo com o texto ${text}`);
    } else {
      this.setState({
        todos: [...todos, {text: text, done: false}],
        text: '',
      });
    }
  }

  toggleTodo(id) {
    let todos = this.state.todos.slice();
    let text = todos[id].text;
    var found = this.state.todos.find(function (element, indice) {
      return element.text === text && !element.done && indice !== id;
    });
    if (found) {
      Alert.alert(`Já existe um todo com o texto ${text}`);
    } else {
      todos[id].done = !todos[id].done;
      this.setState({
        todos: todos,
      });
    }
  }

  renderTodos(isDone) {
    const todos = this.state.todos.map((todo, id) => {
      if (todo.done === isDone) {
        return (
          <Todo
            key={id}
            text={todo.text}
            done={todo.done}
            onPress={() => this.toggleTodo(id)}
          />
        );
      }
    });

    return todos;
  }

  render() {
    return (
      <Content>
        <Item stackeLabel>
          <Input
            placeholder="Digite seu todo"
            onChangeText={(text) => this.handleChangeText(text)}
            value={this.state.text}
          />
          <Button
            style={styles.button}
            iconLeft
            onPress={() => this.addTodo()}
            bordered
            block
            title={this.state.text}>
            <Icon style={styles.icon} name="add" />
          </Button>
        </Item>

        <List>
          <Separator bordered>
            <Text style={styles.text}>To do</Text>
          </Separator>
          {this.renderTodos(false)}

          <Separator bordered>
            <Text style={styles.text}>Done</Text>
          </Separator>
          {this.renderTodos(true)}
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  button: {
    borderRadius: 5,
    marginRight: 10,
    marginTop: 3,
    paddingRight: 15,
    backgroundColor: 'green',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
});

export default HomeScreen;
