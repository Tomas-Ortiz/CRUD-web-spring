package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.PersonaDTO;
import com.example.demo.entities.Domicilio;
import com.example.demo.entities.Persona;
import com.example.demo.repository.domicilioRepository;
import com.example.demo.repository.personaRepository;

@Service
public class PersonaService {
	

	private personaRepository repository;
	private domicilioRepository repositorydom;
	

	public PersonaService(personaRepository repository, domicilioRepository repositorydom) {
		super();
		this.repository = repository;
		this.repositorydom = repositorydom;
		
	}
	
	@Transactional
	public List<PersonaDTO> findAll() throws Exception{
		try {
			
			List <Persona> entidades = repository.findAll();
			List <PersonaDTO> dtos = new ArrayList<>();
			
			for(Persona p: entidades) {
				
				PersonaDTO per = new PersonaDTO();
						
				per.setId(p.getId());
				per.setNombre(p.getNombre());
				per.setApellido(p.getApellido());
				per.setEdad(p.getEdad());
				per.setCuil(p.getCuil());
				
				per.setCalle(p.getDomicilio().getCalle());
				per.setNumero(p.getDomicilio().getNumero());
				
				dtos.add(per);
			}
			
			return dtos;
			
		} catch (Exception e) {
			throw new Exception();
		}
		
	}
	
	@Transactional
	public PersonaDTO findById(int id) throws Exception {
		try {
			
			Optional<Persona> opt = repository.findById(id);
			PersonaDTO dto = new PersonaDTO();
			
			Persona p = opt.get();
			
			dto.setId(p.getId());
			dto.setNombre(p.getNombre());
			dto.setApellido(p.getApellido());
			dto.setEdad(p.getEdad());
			dto.setCuil(p.getCuil());
			
			
			dto.setCalle(p.getDomicilio().getCalle());
			dto.setNumero(p.getDomicilio().getNumero());
			
			return dto;
			
		} catch (Exception e) {
			
			throw new Exception();
		}
	}
	
	@Transactional
	public PersonaDTO save (PersonaDTO dto) throws Exception {
		
		Persona entity = new Persona();		

		Domicilio dom = new Domicilio();		
		dom.setCalle(dto.getCalle());
		dom.setNumero(dto.getNumero());
		
			entity.setNombre(dto.getNombre());
			entity.setApellido(dto.getApellido());
			entity.setEdad(dto.getEdad());
			entity.setCuil(dto.getCuil());
			
			entity.setDomicilio(dom);

		try {
			
			entity = repository.save(entity);
			dto.setId(entity.getId());
			return dto;
					
			
		} catch (Exception e) {
			
			throw new Exception();
			
		}
}
	
	
	@Transactional
	public boolean delete(int id) throws Exception{
		
		try {
			
			if(repository.existsById(id)) {
				repository.deleteById(id);
				return true;
			} else {
				throw new Exception();
			}
			
			
		} catch (Exception e) {
			throw new Exception();
		}
	}
	
	@Transactional
	public PersonaDTO update(int id, PersonaDTO dto) throws Exception{
		
		try {
			if(repository.existsById(id)) {
				
				Optional<Persona> opt = repository.findById(id);
				
				Persona p = opt.get();
				
				p.setNombre(dto.getNombre());
				p.setApellido(dto.getApellido());
				p.setEdad(dto.getEdad());
				p.setCuil(dto.getCuil());
				
				if(repositorydom.existsById(p.getDomicilio().getId())) {
					repositorydom.deleteById(p.getDomicilio().getId());
				}
		
				Domicilio dom = new Domicilio(dto.getCalle(), dto.getNumero());
				
				p.setDomicilio(dom);
				
				repository.save(p);
				
				dto.setId(p.getId());
				
				return dto;
				
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			throw new Exception();
		}
	}
	
	
}
