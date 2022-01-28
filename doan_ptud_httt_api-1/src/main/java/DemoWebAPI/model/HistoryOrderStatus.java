package DemoWebAPI.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "HistoryOrderStatus")
public class HistoryOrderStatus {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HistoryId", nullable=false)
	private int historyId;
	@Column(name = "OrderStatus", nullable = false)
	private int orderStatus;
	@Column(name = "OrderStatusDate", nullable = false)
	private Date orderStatusDate;
	@Column(name = "OrderId", nullable = false)
	private int orderid;
	
	
	public HistoryOrderStatus() {
		// TODO Auto-generated constructor stub
	}
	
	public HistoryOrderStatus(int historyid, int status, Date date, int orderid) {
		this.historyId = historyid;
		this.orderid = orderid;
		this.orderStatus = status;
		this.orderStatusDate = date;
		
	}
	public int getHistoryId() {
		return historyId;
	}
	public void setHistoryId(int historyId) {
		this.historyId = historyId;
	}
	public int getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(int orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Date getOrderStatusDate() {
		return orderStatusDate;
	}
	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public void setOrderStatusDate(Date orderStatusDate) {
		this.orderStatusDate = orderStatusDate;
	}
	
	@Override
	public String toString() {
		return "[History: " + this.historyId + ", status: " + this.orderStatus + ", date: " 
	+ this.orderStatusDate.toString() + "]";
	}
}
