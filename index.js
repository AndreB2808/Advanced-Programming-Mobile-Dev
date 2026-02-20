// Cliente.java

public class Cliente {
    private String nome;
    private String email;
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getNome() {
        return nome;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }
}

// Main.java

public class Main {
    public static void main(String[] args) {
        Cliente cliente = new Cliente();
        cliente.setNome("Ana Souza");
        cliente.setEmail("ana.souza@email.com");
        System.out.println("Nome do cliente: " + cliente.getNome());
        System.out.println("Email do cliente: " + cliente.getEmail());
    }
}