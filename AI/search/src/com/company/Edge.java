package com.company;



public class Edge {
    private final String id;
    private final Vertex source;
    private final Vertex destination;
    private final int weight;
    private final int hval;

    public Edge(String id, Vertex source, Vertex destination, int weight, int hval) {
        this.id = id;
        this.source = source;
        this.destination = destination;
        this.weight = weight;
        this.hval = hval;
    }

    public String getId() {
        return id;
    }

    public Vertex getDestination() {
        return destination;
    }

    public Vertex getSource() {
        return source;
    }

    public int getWeight() {
        return weight + hval;
    }

    //@Override
    public String toString() {
        return source + " " + destination;
    }


}