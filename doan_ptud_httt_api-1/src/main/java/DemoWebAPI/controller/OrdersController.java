package DemoWebAPI.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import DemoWebAPI.Repository.OrdersRepository;
import DemoWebAPI.model.Order;

@RestController
@RequestMapping("/api/shipper")
public class OrdersController {

	@Autowired
	OrdersRepository orderrepo;
	
	@GetMapping("all")
	public ResponseEntity<List<Order>> getall()
	{
		List<Order> orders = orderrepo.findAll();
		if (orders.isEmpty())
			return new ResponseEntity<List<Order>>(HttpStatus.NOT_FOUND);
		else return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
	}
	
	@GetMapping("/findorder")
	public ResponseEntity<List<Order>> findNearbyOrders(@RequestParam(name = "local", required = false, defaultValue = "Hồ Chí Minh") String local)
	{
		List<Order> orders = orderrepo.findAvailableOrderNearby(local);
		if(orders.isEmpty())
			return new ResponseEntity<List<Order>>(HttpStatus.NOT_FOUND);
		else return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
	}
	
	@GetMapping("/order/{id}")
	public ResponseEntity<List<Order>> getByShipperId(@PathVariable("id") int id)
	{
		List<Order> data = orderrepo.findByshipperId(id);
		if (!data.isEmpty()) {
			return new ResponseEntity<List<Order>>(data, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Order>>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/{id1}/accept/{id2}")
	public ResponseEntity<Order> acceptOrder(@PathVariable("id1") int id1, @PathVariable("id2") int id2) 
	{ 
		Optional<Order> orderData = orderrepo.findById(id2);
		if (orderData.isPresent()) 
		{ 
			Order _order = orderData.get();
			_order.setShipperId(id1);
			return new ResponseEntity<>(orderrepo.save(_order), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
}
