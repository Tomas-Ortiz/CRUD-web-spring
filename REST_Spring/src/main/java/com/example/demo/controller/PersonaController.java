package com.example.demo.controller;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PersonaDTO;
import com.example.demo.service.PersonaService;

@Controller
@RestController
@RequestMapping(path = "api/v1/persona")
public class PersonaController {

	private PersonaService service;

	public PersonaController(PersonaService service) {
		super();
		this.service = service;
	}

	@GetMapping("/")
	@CrossOrigin("*")
	@Transactional
	public ResponseEntity getAll() {
		
		try {
			return ResponseEntity.status(HttpStatus.OK).body(service.findAll());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Error.\"}");
	
		}
	}
	
	@GetMapping("/{id}")
	@CrossOrigin("*")
	@Transactional
	
	public ResponseEntity getOne(@PathVariable int id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(service.findById(id));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Error.\"}");
		}
	}
	
	@PostMapping("/")
	@CrossOrigin(origins = "*")
	@Transactional
	public ResponseEntity post(@RequestBody PersonaDTO dto) {
		
		try {
			
			return ResponseEntity.status(HttpStatus.OK).body(service.save(dto));
			
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the BODY request, and try again later.\"}");
						
		}
		
	}
	
	@DeleteMapping("/{id}")
	@CrossOrigin(origins = "*")
	@Transactional
	
	public ResponseEntity delete(@PathVariable int id) {
		try {
			
			return ResponseEntity.status(HttpStatus.OK).body(service.delete(id));
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the BODY request, and try again later.\"}");
		}
	}
	
	@PutMapping("/{id}")
	@CrossOrigin
	@Transactional
	
	public ResponseEntity push(@PathVariable int id, @RequestBody PersonaDTO dto) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(service.update(id, dto));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Error. Please check the BODY request, and try again later.\"}");
		}
	}
	
	
	
	
}
