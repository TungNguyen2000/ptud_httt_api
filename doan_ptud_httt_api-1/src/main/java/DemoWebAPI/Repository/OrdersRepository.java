package DemoWebAPI.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import DemoWebAPI.model.Order;

@Repository
//@NoRepositoryBean
public interface OrdersRepository extends JpaRepository<Order, Integer>{

	  List<Order> findByshipperId(int shipperid);
	  @Query(value="select * from Orders o where o.OrderAddress like %?1% and o.shipperId is NULL", nativeQuery = true)
	  List<Order> findAvailableOrderNearby(String local);
}
