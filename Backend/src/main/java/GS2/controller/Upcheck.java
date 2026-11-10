package GS2.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import GS2.service.UpcheckService;

@RestController
@RequestMapping("/upcheck")
public class Upcheck {

        private final UpcheckService service;

        public Upcheck(UpcheckService service) {
                this.service = service;
        }

        @GetMapping
        public Map<String, Object> listarIds() {
                return service.listarIds();
        }
}
