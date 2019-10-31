package eubr.atmosphere.tma.utils;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

/**
 * Useful methods for calculations related to List
 * @author JorgeLuiz
 */
public class ListUtils {

	private ListUtils() {}
	
	public static final boolean isEmpty(Collection<?> items) {
    	return items == null || items.isEmpty();
    }

	public static boolean isNotEmpty(Collection<?> items) {
		return !isEmpty(items);
	}
	
	public static <T> boolean hasSize(List<T> list, int size) {
		return list != null && list.size() == size;
	}
	
	public static <T> boolean oneSize(Collection<T> collection) {
        return collection != null && collection.size() == 1;
    }

	public static <T> T getLastElement(List<T> list) {
		return ListUtils.isEmpty(list) ? null : list.get(list.size()-1);
	}

	public static <T> T getFirstElement(List<T> list) {
		return ListUtils.isEmpty(list) ? null : list.get(0);
	}
	
	public static <T> int size(List<T> list) {
		return ListUtils.isEmpty(list) ? 0 : list.size();
	}

	public static <T> boolean hasSizeGreatherThan(List<T> lista, int valor) {
		int tamanhoLista = ListUtils.isEmpty(lista) ? 0 : lista.size();
		return tamanhoLista > valor;
	}
	
	@SuppressWarnings("unchecked")
	public static <T> List<T> asList(T ... itens) {
		return Arrays.asList(itens);
	}

	public static void clear(List<?> list) {
		if (ListUtils.isNotEmpty(list)) {
			list.clear();
		}
	}
	
}
