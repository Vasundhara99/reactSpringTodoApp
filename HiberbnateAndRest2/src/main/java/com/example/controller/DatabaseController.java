package com.example.controller;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.Todo;


@RestController
public class DatabaseController {
	Configuration con;
	ServiceRegistry sr;
	SessionFactory sf;
	Session session;
	Transaction tx;
public DatabaseController() {
	// TODO Auto-generated constructor stub
    System.out.println("Controller");
	con=new Configuration().configure().addAnnotatedClass(Todo.class);
    sr=new ServiceRegistryBuilder().applySettings(con.getProperties()).buildServiceRegistry();
	sf=con.buildSessionFactory(sr);
	session=sf.openSession();
    tx=session.beginTransaction();
	tx.commit();
}
@CrossOrigin(origins="http://localhost:3000")
@PostMapping(path="/addTask",consumes = "application/json")
public Todo addTask(@RequestBody Todo task)
{
	session=sf.openSession();
    tx=session.beginTransaction();
	session.save(task);
	tx.commit();
	return task;
}
@CrossOrigin(origins="http://localhost:3000")
@PutMapping(path="/editTask",consumes = "application/json")
public Todo editTask(@RequestBody Todo task)
{
	session=sf.openSession();
    tx=session.beginTransaction();
	Query query=session.createQuery("from Todo where taskId=:i");
	query.setParameter("i",task.getTaskId());
	Todo todo=(Todo)query.uniqueResult();
	session.delete(todo);
	session.save(task);
	tx.commit();
	return task;
}
@CrossOrigin(origins="http://localhost:3000")
@GetMapping("/getTask/{id}")
public Todo getTask(@PathVariable(name="id") int id)
{
	 session=sf.openSession();
	Query query=session.createQuery("from Todo where taskId=:i");
	query.setParameter("i", id);
	Todo todo=(Todo)query.uniqueResult();
	return todo;
	
}
@CrossOrigin(origins="http://localhost:3000")
@DeleteMapping("/deleteTask/{id}")
public String deleteActor(@PathVariable(name="id") int id)
{
	session=sf.openSession();
	tx=session.beginTransaction();
	Query query=session.createQuery("from Todo where taskId=:i");
	query.setParameter("i", id);
	Todo todo=(Todo)query.uniqueResult();
	session.delete(todo);
	tx.commit();
	return "deleted";
}

@CrossOrigin(origins="http://localhost:3000")
@GetMapping("/getTasks")
public List<Todo> getTasks()
{
	session=sf.openSession();
	Query query=session.createQuery("from Todo");
	List<Todo> todo=query.list();
	return todo;
}

}
