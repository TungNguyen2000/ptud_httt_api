package DemoWebAPI.model;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Orders")
public class Order {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name ="OrderId", nullable = false, columnDefinition = "int")
	private int OrderId;
	@Column(name = "OrderQuantity", nullable = false)
	private int OrderQuantity;
	@Column(name = "OrderPrice", nullable = false)
	private int OrderPrice;
	@Column(name = "OrderDate", nullable = false)
	private Date OrderDate;
	@Column(name = "OrderAddress", nullable = false)
	private String OrderAddress;
	@Column(name = "OrderPhone", nullable = false)
	private String OrderPhone;
	@Column(name = "BuyerId", nullable = true)
	private int BuyerID;
	@Column(name = "ShipperId", nullable = true)
	private Integer shipperId;
	
	public Order() {}
	public Order(int orderid, int orderquantity, int price, Date orderdate, String address, String phone, int buyerid, Integer shipperid)
	{
		super();
		this.BuyerID = buyerid;
		this.OrderAddress = address;
		this.OrderDate = orderdate;
		this.OrderId = orderid;
		this.OrderPhone = phone;
		this.OrderPrice = price;
		this.OrderQuantity = orderquantity;
		this.shipperId = shipperid;
	}
	
	
	public int getOrderId() {
		return OrderId;
	}
	public void setOrderId(int orderId) {
		this.OrderId = orderId;
	}
	public int getOrderQuantity() {
		return OrderQuantity;
	}
	public void setOrderQuantity(int orderQuantity) {
		this.OrderQuantity = orderQuantity;
	}
	public int getOrderPrice() {
		return OrderPrice;
	}
	public void setOrderPrice(int orderPrice) {
		this.OrderPrice = orderPrice;
	}
	public Date getOrderDate() {
		return OrderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.OrderDate = orderDate;
	}
	public String getOrderAddress() {
		return OrderAddress;
	}
	public void setOrderAddress(String orderAddress) {
		this.OrderAddress = orderAddress;
	}
	public String getOrderPhone() {
		return OrderPhone;
	}
	public void setOrderPhone(String orderPhone) {
		this.OrderPhone = orderPhone;
	}
	public int getBuyerID() {
		return BuyerID;
	}
	public void setBuyerID(int buyerID) {
		this.BuyerID = buyerID;
	}
	public Integer getShipperId() {
		return shipperId;
	}
	public void setShipperId(Integer shipperId) {
		this.shipperId = shipperId;
	}
	@Override
    public String toString() {
        return "Order [id=" + OrderId + ", OrderQuantity=" + OrderQuantity + ", OrderAddress=" + OrderAddress + 
        		", OrderPhone=" + OrderPhone + ", OrderPrice= " + OrderPrice + ", OrderDate" + OrderDate.toString() +", BuyerId= "+ BuyerID + ", ShipperId= " + shipperId + "]";
    }
}
