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

import DemoWebAPI.Repository.HistoryOrderStatusRepository;
import DemoWebAPI.model.HistoryOrderStatus;

@RestController
@RequestMapping("/api/shipper/status")
public class HistoryOrderStatusController {

	@Autowired
	HistoryOrderStatusRepository statusrepo;
	
	@GetMapping("/{id}")
	ResponseEntity<List<HistoryOrderStatus>> getorderstatus(@PathVariable("id") int id)
	{
		List<HistoryOrderStatus> historyorder = statusrepo.findByOrderId(id);
		if(!historyorder.isEmpty())
		{
			return new ResponseEntity<List<HistoryOrderStatus>>(historyorder, HttpStatus.OK);
		}
		else
			return new ResponseEntity<List<HistoryOrderStatus>>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/updatestatus")
	public ResponseEntity<HistoryOrderStatus> capNhatTrangThai(@RequestBody HistoryOrderStatus historyorder) 
	{
		try {
			HistoryOrderStatus _history = statusrepo.save(new HistoryOrderStatus(historyorder.getHistoryId(), historyorder.getOrderStatus(),
					historyorder.getOrderStatusDate(), historyorder.getOrderid()));
					return new ResponseEntity<>(_history, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
