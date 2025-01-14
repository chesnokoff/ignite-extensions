package org.apache.ignite.internal.performancestatistics.handlers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.ignite.internal.util.typedef.internal.U;

import static org.apache.ignite.internal.performancestatistics.util.Utils.MAPPER;

public class SystemViewHandler implements IgnitePerformanceStatisticsHandler {
    private final Map<String, List<Map<String, String>>> results = new HashMap<>();

    @Override public Map<String, JsonNode> results() {
        ObjectNode objectNode = MAPPER.createObjectNode();
        results.forEach((view, rows) -> {
            ArrayNode arrayNode = MAPPER.createArrayNode();
            for (Map<String, String> row : rows) {
                ObjectNode rowNode = MAPPER.createObjectNode();
                for (Map.Entry<String, String> entry : row.entrySet())
                    rowNode.put(entry.getKey(), entry.getValue());
                arrayNode.add(rowNode);
            }
            objectNode.set(view, arrayNode);
        });

        return U.map("systemView", objectNode);
    }

    @Override public void systemView(UUID id, String name, List<Map<String, String>> data) {
        results.put(name, data);
    }
}
