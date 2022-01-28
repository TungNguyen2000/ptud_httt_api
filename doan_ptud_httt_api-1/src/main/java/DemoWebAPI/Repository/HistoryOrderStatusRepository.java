package DemoWebAPI.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import DemoWebAPI.model.HistoryOrderStatus;
import DemoWebAPI.model.Order;

@Repository
public interface HistoryOrderStatusRepository extends JpaRepository<HistoryOrderStatus, Integer>{

	List<HistoryOrderStatus> findByOrderStatus(int status);
	@Query(value="SELECT his.* FROM HistoryOrderStatus his where his.OrderId = :orderid", nativeQuery = true)
	List<HistoryOrderStatus> findByOrderId(@Param("orderid") Integer orderid);
}
